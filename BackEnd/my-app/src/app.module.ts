import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { EmotesModule } from './emotes/emotes.module';
@Module({
  imports: [CardsModule, EmotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
