export interface IRoom {
  name: string;
  lastMessage: IMessage;
  profile: string;
  _id: string;
  messages?: IMessage[];
  unreadMessageCount: number;
}
export interface IMessage {
  sender: IUser;
  message: string;
  room: IRoom;
  updatedAt: string;
}

export interface IUser {
  email: string;
}
