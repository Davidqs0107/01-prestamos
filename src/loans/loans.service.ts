import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { ClientService } from '../client/client.service';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private clientService: ClientService
  ) { }

  async create(createLoanDto: CreateLoanDto) {
    await this.clientService.findOne(createLoanDto.clientId);
    const loan = this.loanRepository.create(createLoanDto)
    return await this.loanRepository.save(loan);
  }

  findAll(paginateDto: PaginateDto, clientId: string) {
    const { limit = 10, skip = 0 } = paginateDto;
    return this.loanRepository.find({
      where: { clientId }, select: { clientId: false },
      take: limit, skip: skip
    });
  }

  async findOne(id: string) {
    const loan = await this.loanRepository.findOneBy({ id });
    return loan;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
