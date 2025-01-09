import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Palette } from "lucide-react";

const BellIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full"
    style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))" }}
  >
    <path
      d="M50 10 C30 10 15 25 15 45 L15 65 Q15 75 25 80 L75 80 Q85 75 85 65 L85 45 C85 25 70 10 50 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      className="text-rose-200"
    />
    <path
      d="M35 80 Q50 90 65 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      className="text-rose-200"
    />
  </svg>
);

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-secondary/5" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold text-primary">
            Beauty Studio
          </h1>
          <p className="text-2xl font-medium text-foreground">
            How would you like to join?
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
            <span className="mr-2 font-medium text-primary">Step 1</span>
            <span className="text-primary/80">of 3</span>
            <span className="ml-3 text-sm text-muted-foreground">
              • Choose your role
            </span>
          </div>
        </motion.div>

        {/* Simple Role Selection */}
        <div className="flex w-full max-w-xl justify-center gap-5">
          {/* Artist Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleRoleSelect("artist")}
            className="group flex w-1/2 flex-col items-center rounded-2xl bg-card p-8 text-center shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-6 rounded-full bg-primary/10 p-6">
              <Palette className="h-14 w-14 text-primary" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Beauty Artist</h2>
            <p className="text-base font-medium text-muted-foreground">
              I want to provide beauty services
            </p>
          </motion.button>

          {/* Customer Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => handleRoleSelect("customer")}
            className="group flex w-1/2 flex-col items-center rounded-2xl bg-card p-8 text-center shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-6 rounded-full bg-primary/10 p-6">
              <Sparkles className="h-14 w-14 text-primary" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Customer</h2>
            <p className="text-base font-medium text-muted-foreground">
              I want to book beauty services
            </p>
          </motion.button>
        </div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center text-base text-muted-foreground"
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </button>
        </motion.p>
      </div>
    </div>
  );
};

export default RoleSelection;
