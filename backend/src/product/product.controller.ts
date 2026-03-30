import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, CreateToppingDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll(@Query('all') all?: string) {
    return this.productService.findAll(all === 'true');
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get product categories' })
  async getCategories() {
    return this.productService.getCategories();
  }

  @Get('toppings')
  @ApiOperation({ summary: 'Get all toppings' })
  async getToppings(@Query('all') all?: string) {
    return this.productService.getToppings(all === 'true');
  }

  @Post('toppings')
  @ApiOperation({ summary: 'Create a new topping' })
  async createTopping(@Body() dto: CreateToppingDto) {
    return this.productService.createTopping(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Put('toppings/:id')
  @ApiOperation({ summary: 'Update a topping' })
  async updateTopping(@Param('id') id: string, @Body() dto: CreateToppingDto) {
    return this.productService.updateTopping(id, dto);
  }
}
