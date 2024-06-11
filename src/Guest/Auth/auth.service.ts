import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

type SignupParams = {
  email: string;
  password: string;
  name: string;
};

type SigninParams = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  private generateJWT(name: string, id: string) {
    return jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 360000,
      },
    );
  }

  async signup({ name, email, password }: SignupParams) {
    const userExists = await this.prismaService.guest.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const guest = await this.prismaService.guest.create({
      data: {
        email,
        name,
        password: hashedpassword,
      },
    });
    return this.generateJWT(name, guest.id);
  }

  async signin({ email, password }: SigninParams) {
    const guest = await this.prismaService.guest.findUnique({
      where: {
        email,
      },
    });

    if (!guest) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const hashedPassword = guest.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid Credentials', 400);
    }

    const token = this.generateJWT(guest.name, guest.id);

    return token;
  }
}
