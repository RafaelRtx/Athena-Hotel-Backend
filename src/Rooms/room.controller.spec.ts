import { TestingModule, Test } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PrismaService } from 'src/Prisma/prisma.service';
import { HttpException } from '@nestjs/common';

describe('RoomController', () => {
  let controller: RoomController;
  let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: {
            getRooms: jest.fn().mockReturnValue([]),
            getRoomById: jest.fn().mockReturnValue([]),
          },
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
    roomService = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRooms', () => {
    it('Should construct getRooms filter correctly', async () => {
      const mockGetRooms = jest.fn().mockReturnValue([]);
      jest.spyOn(roomService, 'getRooms').mockImplementation(mockGetRooms);
      await controller.getRooms('2025-10-10', '2025-10-15');

      expect(mockGetRooms).toBeCalledWith({
        dateStart: '2025-10-10',
        dateEnd: '2025-10-15',
      });
    });

    it ('Should throw http exception exception only 1 query param is provided, intead of 2.', async ()=>{
      expect(() =>{
        controller.getRooms('2023-10-18', null)
      }).toThrowError(HttpException)
    })
  });
});
