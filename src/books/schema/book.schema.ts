/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  author: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
