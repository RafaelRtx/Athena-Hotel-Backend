import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AuthService } from './auth.service';
import { ConflictException, HttpException } from '@nestjs/common';

const mockGuest = {
  name: 'Brigitte',
  email: 'brigitte@outlook.com',
  password: 'mei123456',
};

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            guest: {
              create: jest.fn().mockReturnValue(mockGuest),
              findUnique: jest.fn().mockReturnValue([]),
            },
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('Should call prisma.create with correct params', async () => {
      const mockPrismaCreateGuest = jest.fn().mockReturnValue(mockGuest);
      jest
        .spyOn(prismaService.guest, 'create')
        .mockImplementation(mockPrismaCreateGuest);
      const mockPrismaGetGuest = jest.fn().mockReturnValue(null);
      jest
        .spyOn(prismaService.guest, 'findUnique')
        .mockImplementation(mockPrismaGetGuest);

      await service.signup({
        name: 'Brigitte',
        email: 'brigitte@outlook.com',
        password: 'mei123456',
      });

      expect(mockPrismaCreateGuest).toBeCalledWith({
        data: {
          email: 'brigitte@outlook.com',
          name: 'Brigitte',
          password: expect.any(String),
        },
      });
    });

    it('Should throw conflict exception if user already exists', async () => {
      const guestEmail = 'brigitte@outlook.com';
      const mockExistingGuest = jest.fn().mockReturnValue(guestEmail);
      jest
        .spyOn(prismaService.guest, 'findUnique')
        .mockImplementation(mockExistingGuest);

      await expect(service.signup(mockGuest)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('signin', () => {
    const mockGuestSignin = {
      email: 'brigitte@outlook.com',
      password: '$2a$10$0WanVjPQwK4fbKrMx5dPPecY2R4kPP3H2zT8zsQhjtP.iDENaeK/2',
    };

    it('Should call prisma.findUnique with correct params', async () => {
      const mockPrismaSigninGuest = jest.fn().mockReturnValue(mockGuestSignin);
      jest
        .spyOn(prismaService.guest, 'findUnique')
        .mockImplementation(mockPrismaSigninGuest);

      await service.signin({
        email: 'brigitte@outlook.com',
        password: 'mei123456',
      });

      expect(mockPrismaSigninGuest).toBeCalledWith({
        where: {
          email: expect.any(String),
        },
      });
    });

    it('Should throw HTTP Exception: invalid credentials if email or password are incorrects', async () => {
      const mockPrismaGuest = jest.fn().mockReturnValue(null);
      jest
        .spyOn(prismaService.guest, 'findUnique')
        .mockImplementation(mockPrismaGuest);

      await expect(
        service.signin({ email: 'mei123@outlook.com', password: 'mei123456' }),
      ).rejects.toThrowError(new HttpException('Invalid Credentials', 400));
    });
  });
});
