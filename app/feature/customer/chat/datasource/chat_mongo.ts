import { ChatModel, ChatScheme } from "../model/chat_model";
import ChatRepository from "../repository/chat_repository";

class ChatMongo implements ChatRepository {
  async store(chatModel: ChatModel): Promise<void> {
    await ChatScheme.create(chatModel);
  }
}

export default ChatMongo;
