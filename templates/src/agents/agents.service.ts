import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  @Cron('4 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is ');
  }
}
