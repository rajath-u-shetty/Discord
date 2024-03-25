"use client"

import ServerModal from "@/components/modals/ServerModal"
import { useEffect, useState } from "react"
import InviteModal from "../modals/InviteModal";
import EditServerModal from "../modals/EditServerModal";
import MembersModal from "../modals/MembersModal";
import CreateChannelModal from "../modals/ChannelModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import DeleteChannelModal from "../modals/DeleteChannel";
import { MessageFileModal } from "../modals/MessageFileModal";
import { EditChannelModal } from "../modals/EditChannelModal";


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
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
    </>
  )
}

export default ModalProvider
