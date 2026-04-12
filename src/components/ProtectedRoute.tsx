import { useAuth } from "@/contexts/AuthContext";
import AppAccessFallback from "@/components/AppAccessFallback";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <AppAccessFallback />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
