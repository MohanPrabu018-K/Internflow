import { AuthLayout } from "@/components/layouts/auth-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { UserProfile } from "@/components/auth/user-profile";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <UserProfile />
      </AuthLayout>
    </ProtectedRoute>
  );
}
