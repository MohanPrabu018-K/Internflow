import { create } from "zustand";
import type { Page } from "@/types/internflow";
import type { Notification, CopilotSession } from "@/types/ai";

// ─── App Store ────────────────────────────────────────────────────────────────
// Global Zustand store for cross-cutting UI state.

interface AppStore {
  // ─── Theme ───────────────────────────────────────────
  theme: "light" | "dark";
  toggleTheme: () => void;

  // ─── Sidebar ─────────────────────────────────────────
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // ─── Copilot ─────────────────────────────────────────
  copilotOpen: boolean;
  toggleCopilot: () => void;
  setCopilotOpen: (open: boolean) => void;
  copilotSessions: CopilotSession[];
  addCopilotSession: (session: CopilotSession) => void;

  // ─── Notifications ───────────────────────────────────
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // ─── Command Palette ─────────────────────────────────
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Theme
  theme: "light",
  toggleTheme: () =>
    set((s) => ({
      theme: s.theme === "light" ? "dark" : "light",
    })),

  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Copilot
  copilotOpen: false,
  toggleCopilot: () =>
    set((s) => ({ copilotOpen: !s.copilotOpen })),
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  copilotSessions: [],
  addCopilotSession: (session) =>
    set((s) => ({ copilotSessions: [...s.copilotSessions, session] })),

  // Notifications
  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications].slice(0, 50),
      unreadCount: s.unreadCount + 1,
    })),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearNotifications: () =>
    set({ notifications: [], unreadCount: 0 }),

  // Command palette
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
