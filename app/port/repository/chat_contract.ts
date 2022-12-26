import ChatModel from "../../entity/chat_model";

abstract class ChatContract {
  abstract getChatSession(session: string): Promise<ChatModel | null>;

  abstract upsertChatSession(
    session: string,
    chatModel: ChatModel
  ): Promise<ChatModel | null>;
}

export default ChatContract;
