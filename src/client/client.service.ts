import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/services/common.services';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { validate as isUUID } from 'uuid';
@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private commonService: CommonService,
  ) { }
  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  findAll(paginateDto: PaginateDto) {
    const { limit = 10, skip = 0 } = paginateDto;
    const user = this.clientRepository.find({
      take: limit, skip: skip
    });
    return user;
  }

  async findOne(term: string) {
    let client: Client;
    if (isUUID(term)) {
      client = await this.clientRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.clientRepository.createQueryBuilder('client');
      client = await queryBuilder.where('LOWER(email)=:email OR phone=:phone OR ci=:ci', {
        email: term.toLowerCase().trim(),
        phone: term.trim(),
        ci: term.trim()
      }).getOne()
    }
    if (!client) {
      throw new NotFoundException(`Client with ${term} not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({ id, ...updateClientDto });
    if (!client) throw new NotFoundException(`Client with id: ${id} not found`);
    try {
      await this.clientRepository.save(client);
    } catch (error) {
      this.commonService.handleError(error);
    }
    return client;
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    return await this.clientRepository.remove(client);
  }
}
