import ChatModel from "../model/chat_model";

abstract class ChatRepository {
  abstract send(chatModel: ChatModel): Promise<void>;
}

export default ChatRepository;
