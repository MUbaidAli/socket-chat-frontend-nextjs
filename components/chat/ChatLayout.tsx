"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { messagesByConversation } from "@/data/dummy-data";
import type { Message } from "@/types";
import axios from "@/utils/axios";
import { useSocket } from "../SocketProvider";

export default function ChatLayout({ user }) {
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(messagesByConversation);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const socket = useSocket();

  // 1. Fetch Users List
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("/users");
        const fetchedUsers = response.data.data || [];
        setUsers(fetchedUsers);
        
        // Auto-select the first user once data arrives
        if (fetchedUsers.length > 0) {
          setActiveId(fetchedUsers[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    getUsers();
  }, []);

  const active = users.find((c) => c._id === activeId) ?? null;

  // 2. Safely Fetch Single Chat History
  useEffect(() => {
    // Prevent fetching if active chat user is not loaded yet
    if (!user?._id || !active?._id) return;

    async function getChat() {
      try {
        const response = await axios.get(`/chat/${user._id}/${active._id}`);
        console.log("Chat history fetched:", response.data);
        
        // Suggestion: update your local message history state state here
        // setMessages(prev => ({ ...prev, [active._id]: response.data.data }));
      } catch (error) {
        console.error("Failed to fetch chat logs:", error);
      }
    }

    getChat();
  }, [active, user?._id]);

  function handleSelect(id: string) {
    setActiveId(id);
    setMobileChatOpen(true);
  }

  // 3. Fixed Socket Emitter Function
  function handleSend(text: string) {
    console.log("Socket Instance:", socket);

    // Guard Clause Fix: Block execution if socket is disconnected OR no active user selected
    if (!socket || !active?._id) {
      console.warn("Cannot send message: Socket disconnected or no active recipient selected.");
      return;
    }

    socket.emit("private-message", {
      receiverId: active._id,
      text: text.trim()
    });
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-white">
      {/* Sidebar */}
      <aside
        className={`w-full shrink-0 border-r border-slate-200 md:block md:w-[360px] ${
          mobileChatOpen ? "hidden" : "block"
        }`}
      >
        <ChatSidebar
          currentUser={user}
          conversations={users}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </aside>

      {/* Conversation Window */}
      <section className={`min-w-0 flex-1 flex-col md:flex ${mobileChatOpen ? "flex" : "hidden"}`}>
        {active ? (
          <>
            <ChatHeader user={active} onBack={() => setMobileChatOpen(false)} />
            {/* ID Key Fix: Changed active.id to active._id to align with Mongo keys */}
            <MessageList messages={messages[active._id] ?? []} currentUserId={user?._id} />
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
              <MessageCircle size={28} />
            </span>
            <p className="text-lg font-semibold text-slate-900">Select a chat</p>
            <p className="max-w-xs text-slate-500">Choose a conversation from the list to start messaging.</p>
          </div>
        )}
      </section>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { MessageCircle } from "lucide-react";
// import ChatSidebar from "./ChatSidebar";
// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";
// import { conversations, currentUser, messagesByConversation } from "@/data/dummy-data";
// import type { Message } from "@/types";
// import { userAuth } from "../AuthProvider";
// import axios from "@/utils/axios";
// import { useSocket } from "../SocketProvider";

// export default function ChatLayout({user} ) {
//   const [users ,setUsers] = useState([]);
//   const [activeId, setActiveId] = useState<string | null>(users[0]?._id ?? null);
//   const [messages, setMessages] = useState<Record<string, Message[]>>(messagesByConversation);
//   // On mobile, show either the list or the chat
//   const [mobileChatOpen, setMobileChatOpen] = useState(false);
//   const socket = useSocket()

//   console.log(activeId , "idddddddddddd") 


// useEffect(()=>{
// async function getUsers(){

//   try {
//     const response = await axios.get("/users")
//     setUsers(response.data.data)
//   //  console.log(data) 
//   } catch (error) {
//     console.log(error)
//   }
// }

// getUsers()

// },[])









//   const active = users.find((c) => c._id === activeId) ?? null;



// useEffect(()=>{
//     async function getChat(){
//       try {
//        const  data = await axios.get(`/chat/${user._id}/${active._id}`)

// console.log(data, "chatttttttttttttttttttttttttttttttttttt  ")

//       } catch (error) {
//         console.log(error)
//       }


//     }

//     getChat()


// },[active])




//   function handleSelect(id: string) {
//     setActiveId(id);
//     setMobileChatOpen(true);
//   }

//     function handleSend(text: string) {
//       console.log(socket,"sockettttt")
//       if (!activeId && !socket) return;
      

//     socket.emit("private-message" , {
//       receiverId:active._id,
//       text
//     });

//       // const newMessage: Message = {
//       //   id: `m-${Date.now()}`,
//       //   conversationId: activeId,
//       //   senderId: currentUser.id,
//       //   text,
//       //   sentAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
//       //   status: "sent",
//       // };




          
//           // setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMessage] }));
        


//     }

//   // console.log(user, "userrrrrrrrrr")
//   return (
//     <div className="flex h-dvh overflow-hidden bg-white">
//       {/* Sidebar */}
      
//       <aside
//         className={`w-full shrink-0 border-r border-slate-200 md:block md:w-[360px] ${
//           mobileChatOpen ? "hidden" : "block"
//         }`}
//       >
//         <ChatSidebar
//           currentUser={user}
//           conversations={users}
//           activeId={activeId}
//           onSelect={handleSelect}
          
//         />
//       </aside>

//       {/* Conversation */}
//       <section className={`min-w-0 flex-1 flex-col md:flex ${mobileChatOpen ? "flex" : "hidden"}`}>
//         {active ? (
//           <>

//             <ChatHeader user={active} onBack={() => setMobileChatOpen(false)} />
//             <MessageList messages={messages[active.id] ?? []} currentUserId={currentUser.id} />
//             <MessageInput onSend={handleSend} />
//           </>
//         ) : (
//           <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
//             <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
//               <MessageCircle size={28} />
//             </span>
//             <p className="text-lg font-semibold text-slate-900">Select a chat</p>
//             <p className="max-w-xs text-slate-500">Choose a conversation from the list to start messaging.</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
