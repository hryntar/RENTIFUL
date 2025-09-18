"use client";

export default function SignIn() {
  // The actual signin form and redirect logic is handled by the AuthProvider wrapper
  // This page serves as a route that triggers the signin state in the Authenticator
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading sign in...</p>
      </div>
    </div>
  );
}