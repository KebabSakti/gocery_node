import mongoose from "mongoose";
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
  ): Promise<ChatModel> {
    const transaction = await mongoose.startSession();
    
    transaction.startTransaction();

    await ChatItemScheme.deleteMany({ session: session }).session(transaction);

    for (const item of chatModel.chats!) {
      await ChatItemScheme.create([item], { transaction });
    }

    const results = await ChatScheme.findOneAndUpdate(
      {
        session: session,
      },
      chatModel,
      { upsert: true, returnDocument: "after" }
    )
      .lean()
      .populate("chats")
      .select("-active -created_at -updated_at -__v")
      .session(transaction);

    await transaction.commitTransaction();

    return results;
  }
}

export default ChatMongodb;
