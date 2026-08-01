"use client";

import { useAuthContext } from "./auth-context";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card, CardBody, CardHeader } from "@/components/shared/cards";

export function UserProfile() {
  const { user, session, logout } = useAuthContext();

  if (!user || !session) return null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">User Profile</h2>
              <p className="text-xs text-slate-400">Current authenticated session</p>
            </div>
            <Badge tone="info">{user.role}</Badge>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Name</p>
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-medium text-slate-900">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Department</p>
              <p className="text-sm font-medium text-slate-900">{user.department ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Token Expiry</p>
              <p className="text-sm font-medium text-slate-900">{new Date(session.expiresAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
