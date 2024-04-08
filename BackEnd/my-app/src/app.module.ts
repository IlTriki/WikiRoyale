import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { EmotesModule } from './emotes/emotes.module';
import { CardDetailModule } from './card-detail/card-detail.module';
@Module({
  imports: [CardsModule, EmotesModule, CardDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
