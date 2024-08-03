import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CollectionsService } from 'src/collections/collections.service';
import { CommonService } from 'src/common/services/common.services';
import { validate as isUUID } from 'uuid';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private collectionService: CollectionsService,
    private commonService: CommonService
  ) { }
  async create(createDeliveryDto: CreateDeliveryDto) {
    const { collectionId } = createDeliveryDto;
    if (!isUUID(collectionId)) throw new BadRequestException(`This CollectionId ${collectionId} is not UUID`);
    await this.collectionService.findOne(collectionId);

    try {
      const delivery = this.deliveryRepository.create(createDeliveryDto);
      return await this.deliveryRepository.save(delivery);
    } catch (error) {
      this.commonService.handleError(error);
    }

  }

  findAll(paginateDto: PaginateDto) {
    const { limit = 10, skip = 0 } = paginateDto;
    return this.deliveryRepository.find(
      { take: limit, skip }
    )
  }

  findOne(id: string) {
    const delivery = this.deliveryRepository.findOneBy({ id });
    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.deliveryRepository.preload({ id, ...updateDeliveryDto });
    if (!delivery) throw new NotFoundException(`This delivery with ${id} not found`);
    try {
      return await this.deliveryRepository.save(delivery);
    } catch (error) {
      this.commonService.handleError(error);
    }

  }

  async remove(id: string) {
    const delivery = await this.findOne(id);
    return this.deliveryRepository.remove(delivery);
  }
}
