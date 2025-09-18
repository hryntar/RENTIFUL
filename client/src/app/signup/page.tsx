"use client";

export default function SignUp() {
  // The actual signup form and redirect logic is handled by the AuthProvider wrapper
  // This page serves as a route that triggers the signup state in the Authenticator
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading sign up...</p>
      </div>
    </div>
  );
}