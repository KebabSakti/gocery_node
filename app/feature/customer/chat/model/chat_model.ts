import { model, Schema } from "mongoose";

export interface ChatModel {
  _id?: string;
  session?: string;
  from?: {
    _id: string;
    name: string;
  };
  to?: {
    _id: string;
    name: string;
  };
  message?: string;
  image?: boolean;
  read?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const ChatScheme = model<ChatModel>(
  "chats",
  new Schema<ChatModel>({
    session: { type: String, required: true },
    from: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
    to: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
    message: { type: String, required: true },
    image: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
