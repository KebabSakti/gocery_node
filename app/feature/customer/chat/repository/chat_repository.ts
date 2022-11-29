import { ChatModel } from "../model/chat_model";

abstract class ChatRepository {
  abstract update(chatModel: ChatModel): Promise<void>;
}

export default ChatRepository;
