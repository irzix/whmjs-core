import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateOwnUserDto } from './dto/update-own-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'create', 'all')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'read', 'all')
  @Get()
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'read', 'all')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'update', 'own')
  @Patch('/me')
  update(@Body() updateOwnUserDto: UpdateOwnUserDto, @Req() req) {
    return this.usersService.updateOwn(req.user.id, updateOwnUserDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'update', 'all')
  @Patch(':id')
  updateOwn(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOwn(id, updateUserDto);
  }


  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('users', 'delete', 'all')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
