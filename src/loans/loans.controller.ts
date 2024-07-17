import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get('client/:clientId')
  findAll(@Query() paginateDto: PaginateDto, @Param('clientId', ParseUUIDPipe) clientId: string) {
    return this.loansService.findAll(paginateDto, clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
