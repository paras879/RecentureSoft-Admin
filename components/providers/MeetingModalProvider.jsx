"use client";
import React, { createContext, useContext, useState } from "react";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";

const MeetingModalContext = createContext({
    isMeetingModalOpen: false,
    openMeetingModal: () => {},
    closeMeetingModal: () => {},
});

export const useMeetingModal = () => useContext(MeetingModalContext);

export function MeetingModalProvider({ children }) {
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

    const openMeetingModal = () => setIsMeetingModalOpen(true);
    const closeMeetingModal = () => setIsMeetingModalOpen(false);

    return (
        <MeetingModalContext.Provider value={{ isMeetingModalOpen, openMeetingModal, closeMeetingModal }}>
            {children}
            <ScheduleMeetingModal isOpen={isMeetingModalOpen} onClose={closeMeetingModal} />
        </MeetingModalContext.Provider>
    );
}
