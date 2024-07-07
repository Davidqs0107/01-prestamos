import { Module } from '@nestjs/common';
import { CommonService } from './services/common.services';

@Module({
    providers: [CommonService],
    exports: [CommonService]
})
export class CommonModule { }
