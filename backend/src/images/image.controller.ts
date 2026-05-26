import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { ImageService } from './image.service';
import type { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  // a proposito no tiene el auth guard, no hay que ponerlo
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const image = await this.imageService.getOne(id);
    if (!image) throw new NotFoundException();
    if (image.url) {
      return res.redirect(image.url);
    }
    res.set({ 'Content-Type': image.mimeType }).send(image.content);
  }
}
