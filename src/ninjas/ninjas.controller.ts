import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
// @UseGuards(BeltGuard) // Controller level Guard
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  // GET /ninjas?weapon -> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaService.getNinjas(weapon);
  }

  // GET /ninjas/:id -> {}
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas -> Create Ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id -> {}
  @Put(':id')
  updateNinjas(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinjas(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.deleteNinja(id);
  }
}
