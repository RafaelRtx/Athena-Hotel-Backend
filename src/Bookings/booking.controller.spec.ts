import { TestingModule, Test } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from 'src/Prisma/prisma.service';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const mockBookingParams = {
  checkinDate: '2023-10-10',
  checkoutDate: '2023-10-20',
  guestNumber: 2,
  roomId: 1,
};

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            getBookings: jest.fn().mockReturnValue([]),
            createBooking: jest.fn().mockReturnValue(mockBookingParams),
          },
        },
        PrismaService,
        JwtService,
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBookings', () => {
    it('Should construct filter params correctly', async () => {
      const mockGetBookings = jest.fn().mockReturnValue([]);
      jest
        .spyOn(bookingService, 'getBookings')
        .mockImplementation(mockGetBookings);
      await controller.getBookings('2025-10-10', '2025-10-20');

      expect(mockGetBookings).toBeCalledWith({
        dateStart: '2025-10-10',
        dateEnd: '2025-10-20',
      });
    });

    it('Should throw http exception exception if date is not provided', async () => {
      expect(() => {
        controller.getBookings('2023-10-18', null);
      }).toThrowError(HttpException);
    });
  });

  describe('createBooking', () => {
    it('should throw unauthorized exception if JWT token returns no guest', async () => {
      const noGuest = null;
      expect(() => {
        controller.createBooking(mockBookingParams, noGuest);
      }).toThrowError(UnauthorizedException);
    });

    it('should throw HTTP exception if checkout date is lower than checkin date', async () => {
      const mockInvalidDate = {
        checkinDate: '2023-10-20',
        checkoutDate: '2023-10-18',
        guestNumber: 2,
        roomId: 1,
      };
      const mockGuestInfo = {
        name: 'Jameson',
        id: 'UUID',
        iat: 1,
        exp: 2,
      };

      expect(() => {
        controller.createBooking(mockInvalidDate, mockGuestInfo);
      }).toThrowError(HttpException);
    });
  });
});
