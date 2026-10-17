
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";


const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)



export default function SocketProvider({children, currentUserId} :{children:React.ReactNode}) {
    const [socket,setSocket] = useState(undefined)
    // const [isOnline ,setIsOnline] =  useState(false); 
    useEffect(()=>{
            if(!currentUserId) return;

            const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      autoConnect: true,
    })

            socketInstance.on("connect" , (socket)=>{
                        // console.log(socket.id)
                        socketInstance.emit("login" , currentUserId)
                        // setIsOnline(true)

            })


            setSocket(socketInstance)

            
            return () =>{
                socketInstance.disconnect();
            }



    },[currentUserId])


 
    return (
        <SocketContext.Provider value={socket}>

    <div>{children}</div>
        </SocketContext.Provider>
  )
}









// import React, { createContext, useEffect, useState } from 'react'

// import { io } from 'socket.io-client';



// const SocketContext  = createContext(null)


// export default function SocketProvider({children,currentUserId} : {children:React.ReactNode,currentUserId:string}) {


//     const [socket,setSocket] = useState(null)




// // connection Login

//     function socketConnection(){
//         if(!currentUserId) return;
//         const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL)
        
//         console.log(currentUserId , "user id from socketProvider")
//         socketInstance.on("connect" , ()=>{
//              console.log('Connected to backend:', socketInstance.id);
//              socketInstance.emit("login" , currentUserId)
//         })


//         setSocket(socketInstance);
//     }



//     useEffect(()=>{

//          socketConnection()


//     } ,[currentUserId])





//     return (

//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   )
// }
