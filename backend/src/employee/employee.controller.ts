import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() dto: any, @Request() req) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can create accounts');
    return this.employeeService.create(dto);
  }

  @Get()
  findAll(@Request() req) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can view all accounts');
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.sub !== id) {
      throw new ForbiddenException('Forbidden');
    }
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.sub !== id) {
      throw new ForbiddenException('Forbidden');
    }
    return this.employeeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Only admin can delete accounts');
    return this.employeeService.remove(id);
  }
}
