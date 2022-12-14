import { ChatModel } from "../model/chat_model";

abstract class ChatRepository {
  abstract show(session: string): Promise<ChatModel | null>;

  abstract update(chatModel: ChatModel): Promise<void>;
}

export default ChatRepository;
