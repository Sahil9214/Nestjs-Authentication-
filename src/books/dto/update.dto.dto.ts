/* eslint-disable prettier/prettier */
import { IsEmpty } from 'class-validator';
import { Category } from '../schema/book.schema';
import { User } from 'src/auth/schema/user.schema';

export class UpdateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: number;
  readonly category: Category;
  @IsEmpty({ message: 'You cannot pass userId' })
  readonly user: User;
}
