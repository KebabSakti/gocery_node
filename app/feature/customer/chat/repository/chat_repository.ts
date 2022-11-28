import { ChatModel } from "../model/chat_model";

abstract class ChatRepository {
  abstract store(chatModel: ChatModel): Promise<void>;
}

export default ChatRepository;
