import { Test, TestingModule } from '@nestjs/testing';
import { BookingService, bookingSelect } from './booking.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, NotFoundException } from '@nestjs/common';

const mockGetBookings = [
  {
    id: 1,
    room_id: 1,
  },
];

const mockGetRooms = {
  quantity: 3,
  bookings: [
    {
      id: 1,
      room_id: 2,
    },
  ],
};

const mockCreateBookingResponse = {
  checkinDate: '2023-10-10',
  checkoutDate: '2023-10-20',
  guestId: 1,
  guestNumber: 2,
  roomId: 1,
};

describe('BookingService', () => {
  let service: BookingService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: PrismaService,
          useValue: {
            bookings: {
              findMany: jest.fn().mockReturnValue([mockGetBookings]),
              create: jest.fn().mockReturnValue(mockCreateBookingResponse),
            },
            room: {
              findUnique: jest.fn().mockReturnValue(mockGetRooms),
            },
          },
        },
      ],
    }).compile();
    service = module.get<BookingService>(BookingService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBookings', () => {
    const filters = {
      dateStart: '2023-10-10',
      dateEnd: '2023-10-20',
    };

    it('Should call prisma.findMany with correct params', async () => {
      const mockPrismaFindManyHomes = jest
        .fn()
        .mockReturnValue(mockGetBookings);
      jest
        .spyOn(prismaService.bookings, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      await service.getBookings(filters);

      expect(mockPrismaFindManyHomes).toBeCalledWith({
        select: {
          ...bookingSelect,
        },
        where: {
          date_check_in: {
            lte: new Date(filters.dateEnd).toISOString(),
          },
          date_check_out: {
            gte: new Date(filters.dateStart).toISOString(),
          },
        },
      });
    });

    it("should throw not found exception if there's no reservations", async () => {
      try {
        await service.getBookings(filters);
      } catch (error) {
        expect(error instanceof NotFoundException).toBe(true);
      }
    });
  });

  describe('createBookings', () => {
    const mockCreateBookingParams = {
      checkinDate: '2023-10-10',
      checkoutDate: '2023-10-20',
      guestNumber: 2,
      roomId: 1,
    };

    it('Should return created booking object response correctly', async () => {
      const mockCreateBooking = jest
        .fn()
        .mockReturnValue(mockCreateBookingResponse);
      const mockGetRoom = jest.fn().mockReturnValue(mockGetRooms);

      jest
        .spyOn(prismaService.room, 'findUnique')
        .mockImplementation(mockGetRoom);
      jest
        .spyOn(prismaService.bookings, 'create')
        .mockImplementation(mockCreateBooking);

      await service.createBooking(mockCreateBookingParams, 'UUID');

      expect(mockCreateBooking).toBeCalledWith({
        data: {
          date_check_in: '2023-10-10T00:00:00.000Z',
          date_check_out: '2023-10-20T00:00:00.000Z',
          guest_id: expect.any(String),
          number_of_guests: 2,
          room_id: 1,
        },
      });
    });

    it('Should return an http exception if room is full ', async () => {
      const getRoomsFull = {
        quantity: 1,
        bookings: [
          {
            id: 1,
            room_id: 2,
          },
        ],
      };
      const mockGetRoomsFull = jest.fn().mockReturnValue(getRoomsFull);
      jest
        .spyOn(prismaService.room, 'findUnique')
        .mockImplementation(mockGetRoomsFull);

      await expect(
        service.createBooking(mockCreateBookingParams, 'UUID'),
      ).rejects.toThrowError(HttpException);
    });
  });
});
