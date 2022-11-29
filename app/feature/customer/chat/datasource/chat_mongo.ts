import { ChatModel, ChatScheme } from "../model/chat_model";
import ChatRepository from "../repository/chat_repository";

class ChatMongo implements ChatRepository {
  async update(chatModel: ChatModel): Promise<void> {
    await ChatScheme.findOneAndUpdate({ _id: chatModel._id }, chatModel, {
      upsert: true,
    });
  }
}

export default ChatMongo;
