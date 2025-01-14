import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Palette, Brush, Crown } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/signup");
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
          <img
            src="/logo-bell.png"
            alt="Beauty Studio"
            className="mx-auto mb-4 h-16 w-auto"
          />
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
        <div className="flex w-full max-w-xl justify-center gap-3">
          {/* Artist Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => handleRoleSelect("artist")}
            className="flex flex-col items-center w-full p-6 transition-all border shadow-sm bg-background border-border/40 rounded-2xl hover:shadow-md"
          >
            <div className="p-3 mb-4 rounded-full bg-primary/5">
              <Brush className="w-8 h-8 text-primary" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Beauty Artist</h2>
            <p className="text-sm text-center text-muted-foreground">
              Showcase your work and grow your client base
            </p>
          </motion.button>

          {/* Member Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleRoleSelect("member")}
            className="flex flex-col items-center w-full p-6 transition-all border shadow-sm bg-background border-border/40 rounded-2xl hover:shadow-md"
          >
            <div className="p-3 mb-4 rounded-full bg-secondary/5">
              <Crown className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Member</h2>
            <p className="text-sm text-center text-muted-foreground">
              Book beauty services from top artists
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
