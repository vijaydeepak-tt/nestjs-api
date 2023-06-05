import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 0,
      name: 'Ninja 1',
      weapon: 'stars',
    },
    {
      id: 1,
      name: 'Ninja 2',
      weapon: 'nunchucks',
    },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((n) => n.weapon === weapon);
    }
    return this.ninjas.slice(0);
  }

  getOneNinja(id: number) {
    const ninja = this.ninjas.find((n) => n.id === id);
    if (!ninja) {
      throw new Error('Ninja not founs!');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...createNinjaDto,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (id === ninja.id) {
        return {
          ...ninja,
          ...updateNinjaDto,
        };
      }
      return ninja;
    });
    return this.getOneNinja(id);
  }

  deleteNinja(id: number) {
    const removedNinja = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => id !== ninja.id);
    return removedNinja;
  }
}
