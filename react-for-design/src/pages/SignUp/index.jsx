import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Palette } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");

  const handleGoogleSignUp = () => {
    // Here you would handle Google authentication
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-secondary/5" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center px-4 py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-border/40 bg-background/95 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to role selection
        </motion.button>

        {/* Main Content */}
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <img
              src="/logo-bell.png"
              alt="Beauty Studio"
              className="mx-auto mb-4 h-16 w-auto"
            />
            <p className="text-2xl font-medium text-foreground">
              Create your account
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10 flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-6 py-2">
              <span className="mr-2 font-medium text-primary">Step 2</span>
              <span className="text-primary/80">of 3</span>
              <span className="ml-3 text-sm text-muted-foreground">
                • Connect with Google
              </span>
            </div>
          </motion.div>

          {/* Role Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex items-center justify-center gap-3 rounded-full border border-border/40 bg-background/95 px-4 py-2"
          >
            <div className="rounded-full bg-primary/10 p-2">
              {selectedRole === "artist" ? (
                <Palette className="h-5 w-5 text-primary" />
              ) : (
                <Sparkles className="h-5 w-5 text-primary" />
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              You are registering as a{" "}
              <span className="font-medium text-foreground">
                {selectedRole === "artist" ? "Beauty Artist" : "Customer"}
              </span>
            </span>
          </motion.div>

          {/* Google Sign Up Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md"
          >
            <button
              onClick={handleGoogleSignUp}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-card px-8 py-4 text-base font-medium text-foreground shadow-lg transition-all hover:bg-accent hover:shadow-xl"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </motion.div>

          {/* Info Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </button>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
