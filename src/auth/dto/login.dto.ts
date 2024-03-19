/* eslint-disable prettier/prettier */
// loginData.dto.ts

import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginData {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

// "start:dev": "nest start --watch",
// "start:debug": "nest start --debug --watch",
