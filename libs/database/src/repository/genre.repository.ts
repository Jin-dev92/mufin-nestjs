import { Genre } from '../entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  /* TYPEORM 함수의 오버라이딩이 필요한 경우 이곳에 구현 */
  constructor(private dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }
}
