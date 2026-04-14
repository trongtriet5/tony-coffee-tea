import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

interface EmployeeWithBranch {
  id: string;
  username: string;
  name: string;
  password: string;
  role: string;
  branch_id: string | null;
  branch?: { name: string } | null;
}

interface ValidatedUser {
  id: string;
  username: string;
  name: string;
  role: string;
  branch_id: string | null;
  branch?: { name: string } | null;
}

interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  branch_id: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<EmployeeWithBranch, 'password'> | null> {
    const user = await this.prisma.employee.findUnique({
      where: { username },
      include: { branch: true },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password: _pw, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: ValidatedUser) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      branch_id: user.branch_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        branch_id: user.branch_id,
        branch_name: user.branch?.name,
      },
    };
  }
}
