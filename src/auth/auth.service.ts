import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findEmail(email);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');


    return {
      ...user,
      token: this.getJwtToken(user.id)
    };
  }

  private getJwtToken(id: string) {

    const token = this.jwtService.sign({ id });
    return token;

  }
  async findOne(id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

}
