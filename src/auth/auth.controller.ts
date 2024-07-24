import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RawHeaders } from './decorator/get-raw-header.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guard/user-role.guard';
import { RoleProtected } from './decorator/role-protected.decorator';
import { ValidRoles } from './constants/constants';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  @UseGuards(AuthGuard())
  @Get('private')
  testingRoute(
    @GetUser()
    user: User,
    @GetUser('email')
    userEmail: string,
    @RawHeaders()
    rawHeader: string[]
  ) {
    return { user, userEmail, rawHeader }
  }

  @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('private2')
  @RoleProtected(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.user)
  // @SetMetadata('roles', ['admin,super-admin'])
  testingRoute2() {
    return {
      ok: true,
    }

  }

  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  testingRoute3(
    @GetUser()
    user: User,
  ) {
    return {
      ok: true,
      user
    }

  }

}
