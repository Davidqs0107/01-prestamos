import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../constants/constants';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guard/user-role.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(JwtAuthGuard, UserRoleGuard),
    );
}