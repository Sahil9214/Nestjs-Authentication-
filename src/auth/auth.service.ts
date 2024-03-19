/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginData } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>, // comma added here
    private readonly jwtService: JwtService, // no comma needed here
  ) {}

  async signup(signupDto: SignupDto): Promise<string | number> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create a new user document
    const user = await this.userModel.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return token;
  }
  async login(loginData: LoginData): Promise<{ token: string }> {
    const { email } = loginData;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email and password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
//apllication nabegi usmai user name password daalna padega ;

/*token ka end point hota hai return token user name of password ke basis pe 



 */
