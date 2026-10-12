import type { Conversation, Message, User } from "@/types";

export const currentUser: User = {
  id: "u-0",
  name: "Muhammad Ubaid",
  email: "ubaid@example.com",
  status: "online",
};

export const conversations: Conversation[] = [
  {
    id: "c-1",
    participant: { id: "u-1", name: "Ayesha Khan", email: "ayesha@example.com", status: "online" },
    lastMessage: "Sounds good, I'll send the designs tonight.",
    lastMessageAt: "10:42 AM",
    unreadCount: 2,
  },
  {
    id: "c-2",
    participant: { id: "u-2", name: "Hamza Ali", email: "hamza@example.com", status: "away" },
    lastMessage: "Did you push the Stripe changes?",
    lastMessageAt: "9:15 AM",
    unreadCount: 0,
  },
  {
    id: "c-3",
    participant: { id: "u-3", name: "Sara Ahmed", email: "sara@example.com", status: "offline", lastSeen: "yesterday" },
    lastMessage: "Thanks! Talk tomorrow.",
    lastMessageAt: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "c-4",
    participant: { id: "u-4", name: "Bilal Raza", email: "bilal@example.com", status: "online" },
    lastMessage: "Can you review my pull request?",
    lastMessageAt: "Yesterday",
    unreadCount: 5,
  },
  {
    id: "c-5",
    participant: { id: "u-5", name: "Zainab Malik", email: "zainab@example.com", status: "offline", lastSeen: "2 days ago" },
    lastMessage: "The meeting is moved to Friday.",
    lastMessageAt: "Mon",
    unreadCount: 0,
  },
];

export const messagesByConversation: Record<string, Message[]> = {
  "c-1": [
    { id: "m-1", conversationId: "c-1", senderId: "u-1", text: "Hey Ubaid! How is the chat project going?", sentAt: "10:30 AM", status: "read" },
    { id: "m-2", conversationId: "c-1", senderId: "u-0", text: "Going well. The login and register screens are done.", sentAt: "10:34 AM", status: "read" },
    { id: "m-3", conversationId: "c-1", senderId: "u-0", text: "Now I'm working on the chat UI.", sentAt: "10:35 AM", status: "read" },
    { id: "m-4", conversationId: "c-1", senderId: "u-1", text: "Nice! Can you share a preview?", sentAt: "10:40 AM", status: "read" },
    { id: "m-5", conversationId: "c-1", senderId: "u-1", text: "Sounds good, I'll send the designs tonight.", sentAt: "10:42 AM", status: "read" },
  ],
  "c-2": [
    { id: "m-6", conversationId: "c-2", senderId: "u-0", text: "Morning! I finished the checkout page.", sentAt: "9:05 AM", status: "read" },
    { id: "m-7", conversationId: "c-2", senderId: "u-2", text: "Did you push the Stripe changes?", sentAt: "9:15 AM", status: "read" },
  ],
  "c-3": [
    { id: "m-8", conversationId: "c-3", senderId: "u-3", text: "Thanks for the help today.", sentAt: "6:10 PM", status: "read" },
    { id: "m-9", conversationId: "c-3", senderId: "u-0", text: "Anytime. Talk tomorrow.", sentAt: "6:12 PM", status: "delivered" },
  ],
  "c-4": [
    { id: "m-10", conversationId: "c-4", senderId: "u-4", text: "Can you review my pull request?", sentAt: "4:20 PM", status: "read" },
  ],
  "c-5": [
    { id: "m-11", conversationId: "c-5", senderId: "u-5", text: "The meeting is moved to Friday.", sentAt: "11:00 AM", status: "read" },
  ],
};
