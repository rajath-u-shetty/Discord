"use client"

import ServerModal from "@/components/modals/ServerModal"
import { useEffect, useState } from "react"
import InviteModal from "../modals/InviteModal";
import EditServerModal from "../modals/EditServerModal";
import MembersModal from "../modals/MembersModal";
import CreateChannelModal from "../modals/ChannelModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";


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
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  )
}

export default ModalProvider
