import { TestingModule, Test } from "@nestjs/testing";
import { PrismaService } from "src/Prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


const MockGuestSignup = {
  name: "Brigitte",
  email:"brigitte@outlook.com",
  password:"mei123456"
}

describe("AuthController", () =>{
  let controller: AuthController;
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[AuthController],
      providers:[{
        provide: AuthService,
        useValue:{
          signup : jest.fn().mockReturnValue(MockGuestSignup),
          signin : jest.fn().mockReturnValue([])
        }
      }, PrismaService
    ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('Should be defined', ()=>{
    expect(controller).toBeDefined()
  })

  describe('signup', () => {
    it("Should create signup body params correctly", async () => {
      await controller.signup(MockGuestSignup)

      expect(authService.signup).toBeCalledWith({
        ...MockGuestSignup
      })
    })
  })

  describe('signin', ()=>{
    const MockGuestSignin = {
      email: "brigitte@outlook.com",
      password:"password123"
    }
    it("Should create signin body params correctly", async ()=>{
      await controller.signin(MockGuestSignin)

      expect(authService.signin).toBeCalledWith({
        ...MockGuestSignin
      })
    })
  })

})