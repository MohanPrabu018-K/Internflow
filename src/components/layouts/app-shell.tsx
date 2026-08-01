"use client";

import {
  LayoutDashboard, Users, GitBranch, ClipboardCheck, Calendar,
  Award, Mail, BarChart2, Settings, Search, Bell, Sun, Moon, Menu,
  Plus, ChevronLeft, LogOut, ChevronDown, Sparkles, X,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/components/auth/auth-context";
import { canAccessPage } from "@/lib/auth-guards";
import { NAV_ITEMS, PAGE_TITLES, CANDIDATES } from "@/lib/internflow-data";
import { useAppStore } from "@/store/app-store";
import type { Page } from "@/types/internflow";

export function Sidebar({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  const { user, logout } = useAuthContext();
  const visibleItems = NAV_ITEMS.filter((item) => (user ? canAccessPage(user.role, item.id) : true));
  const initials = user ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2) : "PK";
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  if (sidebarCollapsed) {
    return (
      <div className="flex-shrink-0 bg-white border-r border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col items-center py-3 space-y-4 w-16">
        <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        <nav className="flex-1 space-y-1 w-full px-2">
          {visibleItems.map((item) => {
            const active = currentPage === item.id || (currentPage === "candidate-profile" && item.id === "candidates");
            return (
              <button type="button" key={item.id} onClick={() => onNavigate(item.id)} title={item.label}
                className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-all ${active ? "bg-blue-50 text-[#2563EB]" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                <item.icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>
        <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
      </div>
    );
  }

  return (
    <div className="w-[240px] flex-shrink-0 bg-white border-r border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center"><GitBranch className="w-4 h-4 text-white" /></div>
        <span className="text-base font-bold text-slate-900 dark:text-slate-100">InternFlow</span>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {visibleItems.map((item) => {
            const active = currentPage === item.id || (currentPage === "candidate-profile" && item.id === "candidates");
            return (
              <button type="button" key={item.id} onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${active ? "bg-blue-50 text-[#2563EB]" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#2563EB]" : "text-slate-400"}`} />{item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-xs font-bold">{initials}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{user?.name ?? "Priya Kapoor"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email ?? "priya@acme.com"}</p>
          </div>
          <div className="text-right"><p className="text-[10px] uppercase tracking-wide text-slate-400">{user?.role ?? "ADMIN"}</p><ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-auto" /></div>
        </div>
        <button type="button" onClick={logout} className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"><LogOut className="w-3.5 h-3.5" /> Logout</button>
      </div>
    </div>
  );
}

export function TopNav({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  const { user, logout } = useAuthContext();
  const initials = user ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2) : "PK";
  const { theme, toggleTheme, toggleSidebar, toggleCopilot, unreadCount, notifications, markAllNotificationsRead, addNotification } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      onNavigate("candidates");
    }
  };

  return (
    <div className="h-16 bg-white border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex items-center px-4 gap-2 flex-shrink-0">
      <button onClick={toggleSidebar} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Menu className="w-5 h-5 text-slate-500 dark:text-slate-400" /></button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {currentPage === "candidate-profile" && (
          <button onClick={() => onNavigate("candidates")} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mr-1"><ChevronLeft className="w-4 h-4" /></button>
        )}
        <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{PAGE_TITLES[currentPage] || "InternFlow"}</h1>
        {currentPage === "candidates" && <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-full">{CANDIDATES.length}</span>}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search candidates..." className="text-sm pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-40 lg:w-56 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:text-slate-200 placeholder:text-slate-400" />
        </div>

        <button onClick={toggleCopilot} title="AI Recruiter Copilot" className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Sparkles className="w-4 h-4 text-[#2563EB]" /></button>

        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            {unreadCount > 0 && <span className="absolute top-2 right-2 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[18px] shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Notifications</span>
                <button onClick={() => { markAllNotificationsRead(); addNotification({ id: `n-${Date.now()}`, type: "info", title: "Sample Notification", message: "No new notifications.", read: false, createdAt: new Date().toISOString() }); }} className="text-xs text-[#2563EB] hover:text-blue-800">Mark all read</button>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-3 rounded-xl mb-1 ${n.read ? "opacity-60" : "bg-slate-50 dark:bg-slate-700/50"}`}>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{n.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => setShowNotifications(false)} className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 border-t border-slate-100 dark:border-slate-700">Close</button>
            </div>
          )}
        </div>

        <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Toggle theme">
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
        </button>

        <button onClick={() => onNavigate("candidates")} className="hidden sm:inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"><Plus className="w-3.5 h-3.5" /> Add Candidate</button>

        <div className="ml-1 flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white text-xs font-bold">{initials}</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">{user?.name ?? "Priya Kapoor"}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none mt-1">{user?.email ?? "priya@acme.com"}</p>
            </div>
          </div>
          <button type="button" onClick={logout} className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
