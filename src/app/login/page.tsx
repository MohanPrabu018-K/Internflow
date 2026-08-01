import { Suspense } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { PageLoader } from "@/components/shared/page-loader";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<PageLoader />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
