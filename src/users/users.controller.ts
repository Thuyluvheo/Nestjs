import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  // Inject UsersService vào Controller
  constructor(private readonly usersService: UsersService) {}

  // 1. GET /users - Lấy danh sách toàn bộ users
  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }

  // 2. GET /users/:id - Lấy thông tin 1 user theo ID
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    // Dấu +id giúp chuyển kiểu string thành number (vì param từ URL luôn là string)
    return this.usersService.findOne(+id);
  }

  // 3. POST /users - Tạo mới 1 user
  @Post()
  createUser(@Body() body: { name: string; email: string }): User {
    return this.usersService.create(body);
  }

  // 4. PUT /users/:id - Cập nhật thông tin user
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ): User {
    return this.usersService.update(+id, body);
  }

  // 5. DELETE /users/:id - Xóa 1 user theo ID
  @Delete(':id')
  deleteUser(@Param('id') id: string): { message: string } {
    return this.usersService.remove(+id);
  }
}

