import mongoose from "mongoose";
import { ChatModel, ChatScheme } from "../model/chat_model";
import ChatRepository from "../repository/chat_repository";
import { ChatItemScheme } from "./../model/chat_model";

class ChatMongo implements ChatRepository {
  async show(session: string): Promise<ChatModel | null> {
    const results = await ChatScheme.findOne({ sesion: session }).populate(
      "chats"
    );

    if (results == null) {
      return null;
    }

    return results?.toObject();
  }

  async update(chatModel: ChatModel): Promise<void> {
    const items = [];

    if (chatModel.chats?.length! > 0) {
      await ChatItemScheme.deleteMany({ session: chatModel.session });

      for (const item of chatModel.chats!) {
        const model = {
          ...item,
          _id: new mongoose.Types.ObjectId(),
        };

        items.push(model);

        await ChatItemScheme.create(model);
      }
    }

    await ChatScheme.findOneAndUpdate(
      { session: chatModel.session },
      { ...chatModel, chats: items },
      {
        upsert: true,
      }
    );
  }
}

export default ChatMongo;
