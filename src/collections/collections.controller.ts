import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get('payment/:paymentId')
  findAllPayment(
    @Query() paginateDto: PaginateDto,
    @Param('paymentId', ParseUUIDPipe) paymentId: string,
  ) {
    return this.collectionsService.findAllPayment(paginateDto, paymentId);
  }

  @Get('user/:userId')
  findAllUser(
    @Query() paginateDto: PaginateDto,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.collectionsService.findAllUser(paginateDto, userId);
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.collectionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.collectionsService.remove(id);
  }
}
