"use client";
import React, { createContext, useContext, useState } from "react";
import StartProjectModal from "@/components/StartProjectModal";

const ProjectModalContext = createContext({
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
});

export const useProjectModal = () => useContext(ProjectModalContext);

export function ProjectModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ProjectModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
            {/* The global modal component is rendered here */}
            <StartProjectModal isOpen={isModalOpen} onClose={closeModal} />
        </ProjectModalContext.Provider>
    );
}
