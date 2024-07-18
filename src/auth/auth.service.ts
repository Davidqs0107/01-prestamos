import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService:UserService
  ){}
  
  login(createAuthDto: CreateAuthDto) {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

}
