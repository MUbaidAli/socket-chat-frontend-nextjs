"use client"
import axios from '@/utils/axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserInterface {
    email:string,
    username:string,
    profileURL:string,
}


interface AuthInterface {
    user:UserInterface,
    loading:boolean,
    refreshUser: () => void,
    logout:() => void

}

const init = {
    _id:"",
    email:"",
    username:"",
    profileURL:""

}

const AuthContext = createContext<AuthInterface | null>(null)

export default function AuthProvider({children} : {children:React.ReactNode}) {
    const [user,setUser] = useState<UserInterface | undefined>(undefined)
    const [loading,setLoading] = useState<boolean>(true)
   async function  refreshUser() : Promise<UserInterface>{

        try {
          
        const {data} = await axios.get<UserInterface>("/me", {withCredentials:true})

           console.log(data)
           setUser(data.data) 

           return data; 
        } catch (error:unknown) {
            console.log(error.message)
            throw error

        }finally{
            setLoading(false)
        }

    }



    async function logout(){
        try {
            setLoading(true)

            await axios.get("/logout")

        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        const run = async  ()=>{
            await refreshUser()
        }

        run()
    },[])


    return (
        
<AuthContext.Provider value={{user,refreshUser,logout,loading}}>

    <div>{children}</div>
</AuthContext.Provider>
         )
}



export function userAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be provided inside AuthProvider")
    }
    

    return context

}