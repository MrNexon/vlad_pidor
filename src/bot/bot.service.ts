import { Injectable } from '@nestjs/common';
import {VkIoService} from "../vk-io/vk-io.service";

const VkBot = require('node-vk-bot-api');

@Injectable()
export class BotService {
  public bot;
  private active = false;

  constructor(private vkApi: VkIoService) {
    this.bot = new VkBot({
      token: process.env.BOT_TOKEN,
      confirmation: process.env.CONFIRMATION,
    });

    this.onMessage = this.onMessage.bind(this);
    this.bot.on(this.onMessage);
  }

  private async onMessage(ctx) {
    if (ctx.message.from_id == 152879324) {
      switch (ctx.message.text) {
        case '!старт':
          this.active = true;
          break;
        case '!стоп':
          this.active = false;
          break;
      }
    }

    if (ctx.message.from_id == 408482064 && this.active) {
      await this.vkApi.api.messages.delete({
        peer_id: 2000000241,
        conversation_message_ids: ctx.message.conversation_message_id,
        delete_for_all: true
      });
      ctx.reply("Влад соси хуй");
    }
  }
}
