import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, AuthResponse, LoginFormInputs, loginMicrosoftAD } from '../pages/Login';
import { IRMAData } from '../service';
import { RoutesConfig } from '../router/types';
interface AuthState {
  isAuthenticated: boolean;
  login: (data: LoginFormInputs) => Promise<void>;
  logout: () => void;
  token: string;
  userRemote?: AuthResponse;
  reset: () => void;
  openModalStatus: boolean;
  seeHistoryStatus: (idRmaSelected: string | number) => void;
  idRmaSelected: string | number;
  closeModalHistory: () => void;
  rmaSelected: any;
  openDialogQRCode: boolean;
  setOpenDialogQRCode: (v: boolean, rmaSelected?: IRMAData) => void;
  openDialogPutStatus: boolean;
  setOpenDialogPutStatus: (v: boolean, rmaSelected?: IRMAData) => void;
  home: string;
  groups: string[];
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      home: RoutesConfig.DASHBOARD.path,
      openDialogPutStatus: false,
      groups: [],
      setOpenDialogPutStatus: (v: boolean, rmaSelected?: IRMAData) => {
        if (v) {
          set({
            openDialogPutStatus: v,
            rmaSelected: rmaSelected,
          });
        } else {
          set({
            openDialogPutStatus: false,
          });
          setTimeout(() => {
            set({
              rmaSelected: rmaSelected,
            });
          }, 400);
        }
      },
      rmaSelected: undefined,
      openDialogQRCode: false,
      setOpenDialogQRCode: (v: boolean, rmaSelected?: IRMAData) => {
        if (v) {
          set({
            openDialogQRCode: v,
            rmaSelected: rmaSelected,
          });
        } else {
          set({
            openDialogQRCode: false,
          });
          setTimeout(() => {
            set({
              rmaSelected: rmaSelected,
            });
          }, 400);
        }
      },
      closeModalHistory: () => {
        set({
          openModalStatus: false,
        });
      },
      seeHistoryStatus: (idRmaSelected: string | number) => {
        set({
          openModalStatus: true,
          idRmaSelected: idRmaSelected,
        });
      },
      idRmaSelected: '',
      isAuthenticated: false,
      token: '',
      openModalStatus: false,
      login: async (data: LoginFormInputs) => {
        try {
          const response: AuthResponse = await loginUser(data); // Define explicitamente o tipo da resposta

          const groups = response.roles.map((role) => {
            return role.group;
          });

          set({
            isAuthenticated: true,
            token: response.token,
            userRemote: response,
            groups: groups,
          });

          // set({ isAuthenticated: true, token: token, userRemote: response,home:home });
        } catch (error) {
          console.error('Erro no login:', error);
          throw error;
        }
      },
      logout: () => {
        set({ isAuthenticated: false, token: '' });
      },
      reset: () => {
        set({ isAuthenticated: false, token: '', userRemote: undefined });
      },
    }),
    {
      name: 'auth-storage', // Nome da chave no localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        userRemote: state.userRemote,
        groups: state.groups,
      }), // Persistir apenas os campos necessários
    },
  ),
);
