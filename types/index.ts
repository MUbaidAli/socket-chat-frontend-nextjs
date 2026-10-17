export type UserStatus = boolean;

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  lastSeen?: string;
}

export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  sentAt: string; // display time, e.g. "10:42 AM"
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  email:string;
  profileUrl:string;
  username:string;

}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
