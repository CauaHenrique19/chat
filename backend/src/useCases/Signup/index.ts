import { AWSUploadProvider } from "../../Providers/Implementations/AWSUploadProvider";
import { UserRepository } from "../../Repositories/UserRepository/UserRepository";
import { SignupController } from "./SignupController";
import { SignupUseCase } from "./SignupUseCase";

const userRepository = new UserRepository()
const awsUploadProvider = new AWSUploadProvider()
const signupUseCase = new SignupUseCase(userRepository, awsUploadProvider)
const signupController = new SignupController(signupUseCase)

export { signupController }