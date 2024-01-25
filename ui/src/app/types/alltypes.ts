export interface IRoom extends ChatEntity {
  name: string;
}
export interface IMessage {
  sender: IUser;
  message: string;
  room: IRoom;
  updatedAt: string;
  status: 'delivered' | 'sent';
}

export interface IUser extends ChatEntity {
  email: string;
  password?: string;
}

export interface ChatEntity {
  messages?: IMessage[];
  unreadMessageCount: number;
  profile?: string;
  _id: string;
  lastMessage: IMessage;
  email?: string;
  name?: string;
}
