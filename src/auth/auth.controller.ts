/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';
import { LoginData } from './dto/login.dto'; // Import LoginData DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() signupData: SignupDto,
  ): Promise<{ token: string | number }> {
    const token = await this.authService.signup(signupData);
    return { token };
  }

  @Post('/login')
  async login(@Body() loginData: LoginData): Promise<{ token: any }> {
    const token = await this.authService.login(loginData);
    return { token }; // Return the token in the response
  }
}
