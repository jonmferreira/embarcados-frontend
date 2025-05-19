import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface State {
  openSidemenu: boolean;
  setOpenSideMenu: (value) => void;
  openRMAModal: boolean;
  setOpenRMAModal: (value) => void;
}

export const useStoreHome = create<State>()(
  persist(
    (set) => ({
      openSidemenu: false,
      setOpenSideMenu: (value) => {
        set(() => ({
          openSidemenu: value,
        }));
      },
      openRMAModal: false,
      setOpenRMAModal: (value) => {
        set(() => ({
          openRMAModal: value,
        }));
      },
    }),
    {
      name: 'home-storage', // Nome da chave no localStorage
      partialize: (state) => ({ openSidemenu: state.openSidemenu }), // Persistir apenas os campos necessários
    },
  ),
);
