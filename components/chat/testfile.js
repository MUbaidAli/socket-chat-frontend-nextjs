//backend 

// Helper to generate a consistent, sorted room name for 1-on-1 chats
const getChatRoomId = (id1, id2) => [String(id1), String(id2)].sort().join('_');

io.on("connection", (socket) => {

    socket.on("login", (userId) => {
        if (!userId) return;
        userSockets.set(String(userId), socket.id);     
        socket.userId = String(userId);
    });

    // --- NEW: Client joins a specific 1-on-1 chat window ---
    socket.on("join-chat", async ({ receiverId }) => {
        if (!socket.userId || !receiverId) return;
        const roomName = getChatRoomId(socket.userId, receiverId);
        
        socket.join(roomName);
        console.log(`User ${socket.userId} joined room: ${roomName}`);

        // Automatically mark all previous messages from this sender to me as read
        await Message.updateMany(
            { sender: receiverId, receiver: socket.userId, isRead: false },
            { \$set: { isRead: true } }
        );

        // Notify the other user to clear their unread UI anchors
        socket.to(roomName).emit("messages-read", { readerId: socket.userId });
    });

    // --- NEW: Client leaves the chat window ---
    socket.on("leave-chat", ({ receiverId }) => {
        if (!socket.userId || !receiverId) return;
        const roomName = getChatRoomId(socket.userId, receiverId);
        socket.leave(roomName);
    });

    // --- UPDATED: Private Message Logic ---
    socket.on("private-message", async (payload) => {
        try {
            const { receiverId, text } = payload || {};
            if(!socket.userId || !receiverId || !text?.trim()) return;

            const roomName = getChatRoomId(socket.userId, receiverId);
            
            // Check if the recipient is currently active in the same Room
            const activeSocketsInRoom = await io.in(roomName).fetchSockets();
            const isReceiverInRoom = activeSocketsInRoom.some(s => s.userId === String(receiverId));

            // Create message with conditional isRead status
            const message = await Message.create({
                sender: socket.userId,
                receiver: receiverId,
                message: text.trim(),
                isRead: isReceiverInRoom // True if receiver is inside the room, otherwise false
            });

            const populated = await Message.findById(message.id)
                .populate("sender", "username profileUrl")
                .populate("receiver", "username profileUrl");    
            
            // Send back to the sender
            socket.emit("private-message", populated);

            // Send to recipient
            const receiverSocket = userSockets.get(String(receiverId));
            if(receiverSocket) {
                io.to(receiverSocket).emit("private-message", populated);
                
                // If they are online but NOT in the active room, broadcast an unread notification event
                if (!isReceiverInRoom) {
                    io.to(receiverSocket).emit("unread-notification", {
                        senderId: socket.userId,
                        message: populated
                    });
                }
            }
        } catch(err) {
            console.error("Error in private-message:", err);
        }
    });

    socket.on("disconnect", () => {
        if (socket.userId) userSockets.delete(socket.userId);
    });
});



// frontend


'use client';
import { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';

export default function ChatWindow({ receiverId, currentUserId }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({}); // e.g., { 'senderId': 3 }

  // 1. Manage Active Chat Room State
  useEffect(() => {
    if (!socket || !receiverId) return;

    // Tell the backend we are looking at this specific user's chat window
    socket.emit("join-chat", { receiverId });

    // Clear our local UI unread tracker for this specific person
    setUnreadCounts(prev => ({ ...prev, [receiverId]: 0 }));

    return () => {
      socket.emit("leave-chat", { receiverId });
    };
  }, [socket, receiverId]);

  // 2. Listen for Real-Time Notification Events
  useEffect(() => {
    if (!socket) return;

    // Triggered when a message arrives from a user whose chat is NOT open
    const handleUnreadNotification = ({ senderId }) => {
      if (senderId !== receiverId) {
        setUnreadCounts(prev => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1
        }));
      }
    };

    // Triggered when the other user opens your chat window
    const handleMessagesRead = ({ readerId }) => {
      if (readerId === receiverId) {
        // Mark all your outgoing messages currently on screen as read
        setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
      }
    };

    socket.on("unread-notification", handleUnreadNotification);
    socket.on("messages-read", handleMessagesRead);

    return () => {
      socket.off("unread-notification", handleUnreadNotification);
      socket.off("messages-read", handleMessagesRead);
    };
  }, [socket, receiverId]);

  return (
    <div>
      {/* Dynamic Unread Badge for Chat Sidebar List Item */}
      {unreadCounts[receiverId] > 0 && (
        <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
          {unreadCounts[receiverId]} new
        </span>
      )}
    </div>
  );
}





// unread count api


// Express Route Example
app.get("/api/messages/unread-counts", async (req, res) => {
  try {
    const currentUserId = req.user.id; // or from auth headers

    const counts = await Message.aggregate([
      { $match: { receiver: new mongoose.Types.ObjectId(currentUserId), isRead: false } },
      { $group: { _id: "$sender", count: { $sum: 1 } } }
    ]);
    
    // Transforms payload format to: { "senderUserId": unreadCount }
    const formattedCounts = counts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json(formattedCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
