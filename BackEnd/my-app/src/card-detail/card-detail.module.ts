import { Logger, Module } from '@nestjs/common';
import { CardDetailController } from './card-detail.controller';
import { CardDetailService } from './card-detail.service';

@Module({
  controllers: [CardDetailController],
  providers: [CardDetailService, Logger]
})
export class CardDetailModule {}
