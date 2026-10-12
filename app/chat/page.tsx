// app/chat/page.tsx
"use client"
import { userAuth } from "@/components/AuthProvider";
import ChatLayout from "@/components/chat/ChatLayout";
import SocketProvider from "@/components/SocketProvider";
export default function Page() { 
     const {user , loading} =  userAuth()
    {console.log(user,"userrr")}
     if(loading) return <h1>Loading...</h1>;

// console.log(user._id , "userrrrrrrrrrr")
     
     if(!loading && user.username){

         return <>
        {/* <h1>{user.username}</h1> */}
        <SocketProvider currentUserId={user._id} >

    <ChatLayout user={user} />
        </SocketProvider>
    
    
    </> }
        }