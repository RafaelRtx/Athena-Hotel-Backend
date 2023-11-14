import { TestingModule, Test } from "@nestjs/testing";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaService } from "src/Prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";

const mockBookingParams ={
  date_check_in:"2023-10-10",
  date_check_out:"2023-10-20",
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
    it("Should return all bookings in specific daterange", async ()=>{

      const mockBooking = [{
        "id":5,
        "room_id": 2
      }]
      
      const mockGetBookings = jest.fn().mockReturnValue(mockBooking)
      jest.spyOn(bookingService, "getBookings").mockImplementation(mockGetBookings)
      const result = await controller.getBookings("2023-10-10", "2023-10-20")
  
      expect(mockGetBookings).toBeCalledWith({
        dateStart: "2023-10-10",
        dateEnd: "2023-10-20"
      })
      
      expect(result).toEqual(mockBooking)
    })
  })

  describe("createBooking", () =>{
    const mockGuestInfo ={
      name:"Jameson",
      id:1,
      iat:1,
      exp:2
    }
    const mockCreateBookingParams = {
      checkinDate : "2023-10-10",
      checkoutDate: "2023-10-20",
      guestNumber: 2,
      roomId: 1
    }

    const mockCreateBookingResponse = {
      ...mockCreateBookingParams,
      guestId:1
    }
    it("should return created booking object correctly", async ()=>{

      const mockCreateHome = jest.fn().mockReturnValue(mockCreateBookingResponse)
      jest.spyOn(bookingService, "createBooking").mockImplementation(mockCreateHome)
      const result = await controller.createBooking(mockCreateBookingParams, mockGuestInfo)

      expect(result).toEqual(mockCreateBookingResponse)
    })

    it("should throw unauthorized exception for invalid token", async() =>{
      try{
        await controller.createBooking(mockCreateBookingParams, null)

      }catch(error){
        expect(error instanceof UnauthorizedException).toBe(true)
      }
      
    })
  })

})