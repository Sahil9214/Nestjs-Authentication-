/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-dto.dto';
import { UpdateBookDto } from './dto/update.dto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() bookData: CreateBookDto, @Req() req): Promise<Book> {
    console.log(req.user);
    return this.booksService.create(bookData, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateById(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(id, bookData);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteById(id);
  }
}
