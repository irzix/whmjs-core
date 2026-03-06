import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OptionalAuthGuard } from 'src/common/guards/optional.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('products', 'create', 'all')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() findProductDto: FindProductDto, @Req() req) {
    return this.productsService.findAll(findProductDto, req.user);
  }

  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.productsService.findOne(id, req.user);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('products', 'update', 'own')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() req) {
    return this.productsService.update(id, updateProductDto, req.user);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('products', 'delete', 'own')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.productsService.remove(id, req.user);
  }
}
