import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { ClientService } from '../client/client.service';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { CommonService } from 'src/common/services/common.services';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private clientService: ClientService,
    private commonService: CommonService,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    await this.clientService.findOne(createLoanDto.clientId);
    const loan = this.loanRepository.create(createLoanDto);
    return await this.loanRepository.save(loan);
  }

  findAll(paginateDto: PaginateDto, clientId: string) {
    const { limit = 10, skip = 0 } = paginateDto;
    return this.loanRepository.find({
      where: { clientId },
      select: { clientId: false },
      take: limit,
      skip: skip,
    });
  }

  async findOne(id: string) {
    const loan = await this.loanRepository.findOneBy({ id });
    if (!loan) throw new NotFoundException(`This Loan with ${id} not found`);
    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const loan = await this.loanRepository.preload({ id, ...updateLoanDto });
    if (!loan) throw new NotFoundException(`This loan with ${id} not found`);

    try {
      return await this.loanRepository.save(loan);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async remove(id: string) {
    const loan = await this.findOne(id);
    return this.loanRepository.remove(loan);
  }
}
