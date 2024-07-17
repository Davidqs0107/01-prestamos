import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { LoansService } from 'src/loans/loans.service';
import { CommonService } from 'src/common/services/common.services';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly loanSevice: LoansService,
    private commonService: CommonService,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    await this.loanSevice.findOne(createPaymentDto.loanId);
    const payment = this.paymentRepository.create(createPaymentDto);
    try {
      return await this.paymentRepository.save(payment);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async findAll(paginateDto: PaginateDto,loanId:string) {
    const { limit = 10, skip = 0 } = paginateDto;
    const payment = await this.paymentRepository.find({
      where:{loanId},
      take: limit,
      skip,
    });
    if(!payment) throw new NotFoundException(`The payments with loanId ${loanId} not found`);
    return payment;
  }

  async findOne(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment)
      throw new NotFoundException(`This Payment with ${id} not found`);
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.preload({
      id,
      ...updatePaymentDto,
    });
    if (!payment)
      throw new NotFoundException(`This payment with ${id} not found`);
    try {
      return await this.paymentRepository.save(payment);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async remove(id: string) {
    const payment = await this.findOne(id);

    return await this.paymentRepository.remove(payment);
  }
}
