import { create } from "zustand";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message?: string;
}

interface ToastState {
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (title, message, type = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, title, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
