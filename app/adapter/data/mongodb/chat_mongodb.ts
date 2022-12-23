import ChatModel from "../../../entity/chat_model";
import ChatContract from "../../../port/repository/chat_contract";
import ChatScheme from "./chat_scheme";

class ChatMongodb implements ChatContract {
  async getChatSession(session: string): Promise<ChatModel | null> {
    const results = await ChatScheme.findOne({
      session: session,
    })
      .lean()
      .populate("chats")
      .select("-active -created_at -updated_at -__v");

    return results;
  }

  async upsertChatSession(
    session: string,
    chatModel: ChatModel
  ): Promise<ChatModel> {
    const results = await ChatScheme.findOneAndUpdate(
      {
        session: session,
      },
      chatModel,
      { upsert: true, returnDocument: "after" }
    );

    return results;
  }
}

export default ChatMongodb;
