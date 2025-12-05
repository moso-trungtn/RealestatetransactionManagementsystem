import { create } from 'zustand';

interface ModalStore {
    isOpenLogin: boolean;
    openLogin: () => void;
    closeLogin: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpenLogin: false,
    openLogin: () => set({ isOpenLogin: true }),
    closeLogin: () => set({ isOpenLogin: false }),
}));
