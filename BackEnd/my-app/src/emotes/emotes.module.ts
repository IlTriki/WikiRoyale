import { Logger, Module } from '@nestjs/common';
import { EmotesController } from './emotes.controller';
import { EmotesService } from './emotes.service';

@Module({
  controllers: [EmotesController],
  providers: [EmotesService, Logger]
})
export class EmotesModule {}
