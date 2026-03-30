import { Controller, Post, Get, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List orders' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(
    @Query('page') page?: number, 
    @Query('limit') limit?: number, 
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    return this.orderService.findAll({ page, limit, status, search });
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Business dashboard stats' })
  async getDashboard(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.orderService.getDashboardStats(startDate, endDate);
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
}
