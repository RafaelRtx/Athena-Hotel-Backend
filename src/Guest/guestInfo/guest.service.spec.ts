import { TestingModule, Test } from "@nestjs/testing";
import { PrismaService } from "src/Prisma/prisma.service";
import { GuestService } from "./guest.service";
import { ConflictException, HttpException, NotFoundException } from "@nestjs/common";

const mockGuest = {
  id:1,
  name:"Brigitte",
  email:"brigitte@outlook.com",
  created_at:"2023-04-01",
}



describe("GuestService", () =>{
  let service: GuestService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[GuestService],
      providers:[GuestService, {
        provide: PrismaService,
        useValue:{
          guest:{
            create : jest.fn().mockReturnValue(mockGuest),
            findUnique : jest.fn().mockReturnValue(mockGuest),
            update: jest.fn().mockReturnValue(mockGuest),
            delete: jest.fn().mockReturnValue(mockGuest),
            deleteMany: jest.fn().mockReturnValue(mockGuest)
          }
        }
      }, PrismaService
    ]
    }).compile()

    service = module.get<GuestService>(GuestService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('Should be defined', ()=>{
    expect(service).toBeDefined()
  })

  describe("getAccountInfo", () => {
    it("should call prisma guest.findUnique with correct params", async () => {
      const mockPrismaFindUniqueGuest = jest.fn().mockReturnValue(mockGuest)

      jest.spyOn(prismaService.guest, "findUnique").mockImplementation(mockPrismaFindUniqueGuest)

      await service.getAccountInfo(1)

      expect(mockPrismaFindUniqueGuest).toBeCalledWith({
        where:{
          id:1
        },
        select:{
          id:true,
          name:true,
          email:true,
          created_at:true,
        },
      })
    })
  })

  describe('getGuestReservations', () => {
    const mockGuestBookings ={
      "bookings": [
        {
          id:1,               
          created_at:"2023-10-01",       
          date_check_in:"2023-10-10",    
          date_check_out:"2023-10-15",   
          number_of_guests:2,
          guest_id:1,
          room_id:1 
        }
      ]
    }
     
  

    it('Should call prisma guest.findUnique with correct params', async () => {
      const mockPrismaFindUniqueBookings = jest.fn().mockReturnValue(mockGuestBookings)

      jest.spyOn(prismaService.guest, "findUnique").mockImplementation(mockPrismaFindUniqueBookings)

      await service.getGuestReservations(1)
   
      expect(mockPrismaFindUniqueBookings).toBeCalledWith({
        where:{
          id:1,
        },
        select:{
          bookings:true
        }
      })
    })

    it("Should throw not found exception if there are no reservations", async () => {
      const mockprismaFindUniqueBookings = jest.fn().mockReturnValue({"bookings":[]})

      jest.spyOn(prismaService.guest, "findUnique").mockImplementation(mockprismaFindUniqueBookings)

      await expect(service.getGuestReservations(1)).rejects.toThrowError(NotFoundException)

    })
  })
  
})