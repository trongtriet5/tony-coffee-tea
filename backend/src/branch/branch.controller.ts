import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBranchDto, @Request() req) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can create branch');
    return this.branchService.create(dto);
  }

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
    @Request() req,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can update branch');
    return this.branchService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can delete branch');
    return this.branchService.remove(id);
  }
}
