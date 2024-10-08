import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenresDto, UpdateGenresDto } from '../../controllers';
import { GenreRepository } from '@libs/database';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenreRepository) {}

  async create(dto: CreateGenresDto) {
    try {
      const genre = this.genresRepository.create(dto);
      return await this.genresRepository.save(genre);
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    return this.genresRepository.findAndCount();
  }

  async findOne(id: number) {
    return await this.checkGenre(id);
  }

  async update(id: number, dto: UpdateGenresDto) {
    await this.checkGenre(id);
    this.genresRepository.update(id, dto);
  }

  async remove(id: number) {
    await this.checkGenre(id);
    this.genresRepository.delete(id);
  }

  private async checkGenre(id: number) {
    const genre = await this.genresRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }
}
