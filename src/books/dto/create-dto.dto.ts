/* eslint-disable prettier/prettier */
import { User } from 'src/auth/schema/user.schema';
import { Category } from '../schema/book.schema';
import { IsEmpty } from 'class-validator';

export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: number;
  readonly category: Category;
  @IsEmpty({ message: 'You cannot pass userId' })
  readonly user: User;
}
