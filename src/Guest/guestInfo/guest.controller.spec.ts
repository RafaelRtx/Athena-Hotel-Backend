import { TestingModule, Test } from "@nestjs/testing";
import { PrismaService } from "src/Prisma/prisma.service";
import { GuestController } from "./guest.controller";
import { GuestService } from "./guest.service";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


const mockGuestUpdatedInfo = {
  name:"Cristina White",
  email:"cristina@outlook.com",
  guestId:1
}

const mockGuestInfo ={
  name:"Jameson",
  id:1,
  iat:1,
  exp:2
}

describe("GuestController", () =>{
  let controller: GuestController;
  let guestService: GuestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[GuestController],
      providers:[{
        provide: GuestService,
        useValue:{
          getAccountInfo : jest.fn().mockReturnValue([]),
          getGuestReservations: jest.fn().mockReturnValue([]),
          updateGuestInfo: jest.fn().mockReturnValue(mockGuestUpdatedInfo),
          deleteGuestAccount: jest.fn().mockReturnValue("Account deleted succesessfully")
        }
      }, PrismaService, JwtService
    ]
    }).compile()

    controller = module.get<GuestController>(GuestController)
    guestService = module.get<GuestService>(GuestService)
  })

  it("Should be defined", () =>{
    expect(controller).toBeDefined()
  })

  describe("getAccountInfo", () =>{
    const mockGuestAccInfo = {
      id:1,
      name:"Jameson Nakamura",
      email:"jameson@outlook.com",
      created_at:'2023-04-01'
    }

    it('Should return guest account info correctly', async () => {
      const mockGuestAccInfoResponse = jest.fn().mockReturnValue(mockGuestAccInfo)
      jest.spyOn(guestService, "getAccountInfo").mockImplementation(mockGuestAccInfoResponse)
      const result = await controller.getAccountInfo(mockGuestInfo)

      expect(mockGuestAccInfoResponse).toBeCalledWith(mockGuestAccInfo.id)
      expect(result).toEqual(mockGuestAccInfo)
    })

    it('Should throw unauthorized exception if has no guest', async () => {
      const guest = null
      expect(() => {controller.getAccountInfo(guest)}).toThrowError(UnauthorizedException)
    })
  })

  describe("getUserReservations", () => {
    it('Should get all guest reservations', async () =>{
      const mockGuestReservationsResponse = jest.fn().mockReturnValue([])
      jest.spyOn(guestService, "getGuestReservations").mockImplementation(mockGuestReservationsResponse)
      await controller.getUserReservations(mockGuestInfo)

      expect(mockGuestReservationsResponse).toBeCalledWith(mockGuestInfo.id)
    })

    it('Should throw unauthorized exception if has no guest', async () => {
      const guest = null
      expect(() => {controller.getAccountInfo(guest)}).toThrowError(UnauthorizedException)
    })
  })

  describe("updateGuestInfo", () => {
    const mockUpdateGuestParams = {
      name:"Brigitte",
      email:"brigitte@outlook.com",
    }

    it("Should update guest info with correct params", async () => {
      const mockUpdateGuestInfo = jest.fn().mockReturnValue([])
      jest.spyOn(guestService, "updateGuestInfo").mockImplementation(mockUpdateGuestInfo)

      await controller.updateGuestInfo(mockUpdateGuestParams, mockGuestInfo)

      expect(mockUpdateGuestInfo).toBeCalledWith(
        {
          email: "brigitte@outlook.com", 
          name: "Brigitte"
        },
        1
      )
    })
  })

  describe("deleteGuestAccount", () => {
    it('Should throw Unauthorized exception if has no guest', async() =>{
      const guest = null
      expect(() => {controller.DeleteGuestAccount(guest)}).toThrowError(UnauthorizedException)
    })
  })

})