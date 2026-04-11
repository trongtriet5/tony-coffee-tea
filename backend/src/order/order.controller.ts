import { Controller, Post, Get, Param, Body, Query, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() dto: CreateOrderDto, @Request() req) {
    // Force branch_id for non-admin
    const payload = { ...dto };
    if (req.user.role !== 'ADMIN') {
      payload.branch_id = req.user.branch_id;
    }
    return this.orderService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'List orders' })
  @ApiQuery({ name: 'branch_id', required: false })
  async findAll(
    @Request() req,
    @Query('branch_id') branch_id?: string,
    @Query('page') page?: number, 
    @Query('limit') limit?: number, 
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    const bId = req.user.role === 'ADMIN' ? branch_id : req.user.branch_id;
    return this.orderService.findAll({ branch_id: bId, page, limit, status, search });
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiQuery({ name: 'branch_id', required: false })
  async getDashboard(
    @Request() req,
    @Query('branch_id') branch_id?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const bId = req.user.role === 'ADMIN' ? branch_id : req.user.branch_id;
    return this.orderService.getDashboardStats(bId, startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add items to an existing order' })
  async addItems(
    @Param('id') id: string,
    @Body() body: { items: any[], payment_method?: string }
  ) {
    return this.orderService.addItemsToOrder(id, body.items, body.payment_method);
  }

  @Post(':id/reprint')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Increment print count for reprinting' })
  async incrementPrintCount(@Param('id') id: string) {
    return this.orderService.incrementPrintCount(id);
  }
}
