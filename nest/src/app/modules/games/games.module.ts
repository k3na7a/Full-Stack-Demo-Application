import { Module } from '@nestjs/common';

import { TypeOrmPlugin } from 'src/plugins/typeorm.plugin';
import { PlatformService } from './services/platform.service';
import { GameService } from './services/game.service';

import { PlatformEntity } from './entities/platform.entity';
import { GameEntity } from './entities/game.entity';
import { GenreEntity } from './entities/genre.entity';
import { GenreService } from './services/genre.service';
import { CoverEntity } from './entities/cover.entity';
import { CoverService } from './services/cover.service';
import { SeriesEntity } from './entities/series.entity';
import { SeriesService } from './services/series.service';
import { S3Service } from 'src/app/services/s3.service';

@Module({
  imports: [
    TypeOrmPlugin.forFeature([
      GameEntity,
      PlatformEntity,
      GenreEntity,
      CoverEntity,
      SeriesEntity,
    ]),
  ],
  providers: [
    GameService,
    PlatformService,
    GenreService,
    CoverService,
    SeriesService,
    S3Service,
  ],
  exports: [
    GameService,
    PlatformService,
    GenreService,
    CoverService,
    SeriesService,
  ],
})
export class GamesModule {}
