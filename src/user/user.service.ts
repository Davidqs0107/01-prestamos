import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginateDto } from 'src/common/dto/paginate.dto';
import { validate as IsUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CommonService } from 'src/common/services/common.services';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private commonService: CommonService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { password, ...userDto } = createUserDto;
    try {
      const user = this.userRepository.create(
        {
          ...userDto,
          password: bcrypt.hashSync(password, 10)
        });
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.commonService.handleError(error);
    }

  }

  async findAll(paginateDto: PaginateDto) {
    const { limit = 10, skip = 0 } = paginateDto;
    const users = await this.userRepository.find({ take: limit, skip: skip });
    return users;
  }

  async findOne(term: string) {
    let user: User;
    if (IsUUID(term)) {
      user = await this.userRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder('user');
      user = await queryBuilder.where('LOWER(email)=:email OR phone=:phone OR ci=:ci', {
        email: term.toLowerCase(),
        phone: term,
        ci: term
      }).getOne();
    }
    if (!user) {
      throw new NotFoundException(`This user with ${term} not found`);
    }
    return user;
  }
  async findEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        password: true,
      }
    });
    if (!user) {
      throw new NotFoundException(`this user with ${email} not found`);
    }
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`this user with ${id} not found`);
    }
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
