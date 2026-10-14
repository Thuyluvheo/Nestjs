import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  // Mảng lưu trữ dữ liệu tạm thời trong RAM (In-Memory)
  // Có sẵn 2 user mẫu để tiện test ngay
  private users: User[] = [
    { id: 1, name: 'Nguyen Van A', email: 'vana@example.com' },
    { id: 2, name: 'Tran Thi B', email: 'thib@example.com' },
  ];

  // 1. Lấy tất cả user (GET /users)
  findAll(): User[] {
    return this.users;
  }

  // 2. Lấy 1 user theo ID (GET /users/:id)
  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id: ${id}`);
    }
    return user;
  }

  // 3. Tạo mới user (POST /users)
  create(userData: { name: string; email: string }): User {
    const newUser: User = {
      id: Date.now(), // Sinh ID tự động duy nhất bằng timestamp
      name: userData.name,
      email: userData.email,
    };
    this.users.push(newUser);
    return newUser;
  }

  // 4. Cập nhật user theo ID (PUT /users/:id)
  update(id: number, updateData: { name?: string; email?: string }): User {
    const user = this.findOne(id); // Tận dụng findOne để kiểm tra tồn tại (báo lỗi 404 nếu không có)
    if (updateData.name) {
      user.name = updateData.name;
    }
    if (updateData.email) {
      user.email = updateData.email;
    }
    return user;
  }

  // 5. Xóa user theo ID (DELETE /users/:id)
  remove(id: number): { message: string } {
    this.findOne(id); // Kiểm tra tồn tại trước khi xóa
    this.users = this.users.filter((u) => u.id !== id);
    return { message: `Đã xóa thành công user có id: ${id}` };
  }
}

