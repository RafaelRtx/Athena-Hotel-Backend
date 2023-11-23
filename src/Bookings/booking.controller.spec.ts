import { TestingModule, Test } from "@nestjs/testing";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaService } from "src/Prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";

const mockBookingParams ={
  date_check_in:"2023-10-10",
  date_check_out:"2023-10-20",
  guest_number:5,
  room_id: 2
}

describe('BookingController', ()=>{
  let controller : BookingController;
  let bookingService : BookingService

  beforeEach(async  () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[BookingController],
      providers: [{
        provide: BookingService,
        useValue:{
          getBookings : jest.fn().mockReturnValue([]),
          createBooking: jest.fn().mockReturnValue(mockBookingParams)
        }
      }, PrismaService
    ]
    }).compile()

    controller = module.get<BookingController>(BookingController)
    bookingService = module.get<BookingService>(BookingService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBookings', () =>{
    it("Should construct filter params correctly", async ()=>{
      
      const mockGetBookings = jest.fn().mockReturnValue([])
      jest.spyOn(bookingService, "getBookings").mockImplementation(mockGetBookings)
      await controller.getBookings("2023-10-10", "2023-10-20")
  
      expect(mockGetBookings).toBeCalledWith({
        dateStart: "2023-10-10",
        dateEnd: "2023-10-20"
      })
      
    })
  })

  describe("createBooking", () =>{
    const mockCreateBookingParams = {
      checkinDate : "2023-10-10",
      checkoutDate: "2023-10-20",
      guestNumber: 2,
      roomId: 1,
    }

    it("should throw unauthorized exception if JWT token returns no guest", async() =>{
      const guest = null
      expect(() => {controller.createBooking(mockCreateBookingParams, guest)})
      .toThrowError(UnauthorizedException)
    })
  })

})