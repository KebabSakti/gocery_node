import { model, Schema } from "mongoose";

export interface ChatModel {
  _id?: string;
  session?: string;
  chats?: ChatItemModel[];
  created_at?: string;
  updated_at?: string;
}

export interface ChatItemModel {
  _id?: string;
  session?: string;
  sender?: {
    _id: string;
    name: string;
  };
  message?: string;
  image?: boolean;
  sent?: string;
  read?: string;
  created_at?: string;
  updated_at?: string;
}

export const ChatItemScheme = model<ChatItemModel>(
  "chat_items",
  new Schema<ChatItemModel>({
    session: { type: String, required: true, ref: "chats" },
    sender: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
    message: { type: String, required: true },
    image: { type: Boolean, default: false },
    sent: { type: String, default: null },
    read: { type: String, default: null },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export const ChatScheme = model<ChatModel>(
  "chats",
  new Schema<ChatModel>({
    session: { type: String, required: true },
    chats: [{ type: Schema.Types.ObjectId, required: true, ref: "chat_items" }],
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
