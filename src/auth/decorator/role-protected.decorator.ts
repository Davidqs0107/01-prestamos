import { SetMetadata } from '@nestjs/common';
import { META_ROLES, ValidRoles } from '../constants/constants';


export const RoleProtected = (...args: ValidRoles[]) => {
    return SetMetadata(META_ROLES, args);
}
