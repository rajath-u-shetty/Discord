"use client"

import ServerModal from "@/components/modals/ServerModal"
import { useEffect, useState } from "react"
import InviteModal from "../modals/InviteModal";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }
    
  return (
    <>
      <ServerModal />
      <InviteModal />
    </>
  )
}

export default ModalProvider
