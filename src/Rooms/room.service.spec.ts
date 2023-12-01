import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockRoom = [
  {
    id: 2,
    quantity: 3,
    price: 6000,
    roomType: 'PREMIUM_SIMPLE',
  },
];

const mockBookings = [
  {
    id: 1,
    room_id: 2,
  },

  {
    id: 2,
    room_id: 2,
  },

  {
    id: 3,
    room_id: 2,
  },
];

const roomSelect = {
  id: true,
  quantity: true,
  price: true,
  roomType: true,
};

describe('RoomService', () => {
  let service: RoomService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: PrismaService,
          useValue: {
            room: {
              findMany: jest.fn().mockReturnValue(mockRoom),
              findUnique: jest.fn().mockReturnValue([]),
            },
            bookings: {
              findMany: jest.fn().mockReturnValue(mockBookings),
            },
          },
        },
      ],
    }).compile();
    service = module.get<RoomService>(RoomService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRooms', () => {
    const filters = {
      dateStart: '2023-10-10',
      dateEnd: '2023-10-20',
    };

    it('Should call prisma room.findMany with correct params', async () => {
      const mockPrismaFindManyRoom = jest.fn().mockReturnValue([mockRoom]);
      jest
        .spyOn(prismaService.room, 'findMany')
        .mockImplementation(mockPrismaFindManyRoom);

      await service.getRooms(filters);

      expect(mockPrismaFindManyRoom).toBeCalledWith({
        select: {
          ...roomSelect,
        },
        orderBy: {
          id: 'asc',
        },
      });
    });

    it("Should return throw not found exception if there's no rooms availabe", async () => {
      const mockPrismaFindManyRoom = jest.fn().mockReturnValue(mockRoom);
      jest
        .spyOn(prismaService.room, 'findMany')
        .mockImplementation(mockPrismaFindManyRoom);

      const mockPrismaFindManyBookings = jest
        .fn()
        .mockReturnValue(mockBookings);
      jest
        .spyOn(prismaService.bookings, 'findMany')
        .mockImplementation(mockPrismaFindManyBookings);

      await expect(service.getRooms(filters)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getRoomById', () => {
    it('Should call prisma room.findUnique with correct params', async () => {
      const mockPrismaFindUniqueRoom = jest.fn().mockReturnValue([]);
      jest
        .spyOn(prismaService.room, 'findUnique')
        .mockImplementation(mockPrismaFindUniqueRoom);

      await service.getRoomById(1);

      expect(mockPrismaFindUniqueRoom).toBeCalledWith({
        where: {
          id: 1,
        },
        select: {
          ...roomSelect,
        },
      });
    });

    it('Should throw not found exception provided id is not valid', async () => {
      const mockPrismaFindUniqueRoom = jest.fn().mockReturnValue(null);
      jest
        .spyOn(prismaService.room, 'findUnique')
        .mockImplementation(mockPrismaFindUniqueRoom);

      await expect(service.getRoomById(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
