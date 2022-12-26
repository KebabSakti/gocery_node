import ChatItemModel from "../../../entity/chat_item_model";
import ChatModel from "../../../entity/chat_model";
import ChatContract from "../../../port/repository/chat_contract";
import ChatItemScheme from "./chat_item_scheme";
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
  ): Promise<ChatModel | null> {
    const items: ChatItemModel[] = [];

    if (chatModel.chats != undefined) {
      await ChatItemScheme.deleteMany({ session: session });

      for (const item of chatModel.chats) {
        await ChatItemScheme.create(item);
      }
    }

    const chatSession = await ChatScheme.findOneAndUpdate(
      {
        session: session,
      },
      { ...chatModel, chats: items },
      { upsert: true, returnDocument: "after" }
    )
      .lean()
      .select("-active -created_at -updated_at -__v");

    return chatSession;
  }
}

export default ChatMongodb;
