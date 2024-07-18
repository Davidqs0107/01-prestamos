import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CommonService } from 'src/common/services/common.services';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { PaymentService } from 'src/payment/payment.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    private commonService: CommonService,
    private paymentService: PaymentService,
    private userService: UserService,
  ) {}
  async create(createCollectionDto: CreateCollectionDto) {
    const collection = this.collectionRepository.create(createCollectionDto);
    try {
      return await this.collectionRepository.save(collection);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async findAllPayment(paginateDto: PaginateDto, paymentId: string) {
    await this.paymentService.findOne(paymentId);
    const { limit = 10, skip = 0 } = paginateDto;
    return await this.collectionRepository.find({
      take: limit,
      skip,
      where: { paymentId },
    });
  }

  async findAllUser(paginateDto: PaginateDto, userId: string) {
    await this.userService.findOne(userId);
    const { limit = 10, skip = 0 } = paginateDto;
    return await this.collectionRepository.find({
      take: limit,
      skip,
      where: { userId },
    });
  }
  async findOne(id: string) {
    const collection = await this.collectionRepository.findOneBy({ id });
    if (!collection)
      throw new NotFoundException(`This Collection with ${id} not found`);

    return collection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.collectionRepository.preload({
      id,
      ...updateCollectionDto,
    });
    if (!collection)
      throw new NotFoundException(`This Collection with ${id} not found`);
    return await this.collectionRepository.save(collection);
  }

  async remove(id: string) {
    const collection = await this.findOne(id);
    return await this.collectionRepository.remove(collection);
  }
}
