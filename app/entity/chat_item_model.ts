interface ChatItemModel {
  _id?: string;
  session?: string;
  sender?: string;
  message?: string;
  image?: boolean;
  sent?: string;
  read?: string;
  created_at?: string;
  updated_at?: string;
}

export default ChatItemModel;
