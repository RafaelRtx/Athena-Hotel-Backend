import { TestingModule, Test } from "@nestjs/testing";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";
import { PrismaService } from "src/Prisma/prisma.service";

describe('RoomController', ()=>{
  let controller : RoomController;
  let roomService : RoomService

  beforeEach(async  () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[RoomController],
      providers: [{
        provide: RoomService,
        useValue:{
          getRooms : jest.fn().mockReturnValue([]),
          getRoomById: jest.fn().mockReturnValue([])
        }
      }, PrismaService
    ]
    }).compile()

    controller = module.get<RoomController>(RoomController)
    roomService = module.get<RoomService>(RoomService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRooms', () =>{
    it("Should construct getRooms filter correctly", async()=>{
      const mockGetRooms = jest.fn().mockReturnValue([])
      jest.spyOn(roomService, "getRooms").mockImplementation(mockGetRooms)
      await controller.getRooms("2023-10-10", "2023-10-15")

      expect(mockGetRooms).toBeCalledWith({
        dateStart:"2023-10-10",
        dateEnd:"2023-10-15",
      })
    })
  })

})