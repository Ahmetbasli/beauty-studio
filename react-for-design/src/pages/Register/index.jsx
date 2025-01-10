import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Palette } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem("selectedRole");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-secondary/5" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center min-h-screen px-4 py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-full left-6 top-6 border-border/40 bg-background/95 text-muted-foreground backdrop-blur-sm hover:bg-accent hover:text-foreground"
          onClick={() => navigate("/signup")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </motion.button>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <img
              src="/logo-bell.png"
              alt="Beauty Studio"
              className="w-auto h-16 mx-auto mb-4"
            />
            <p className="text-2xl font-medium text-foreground">
              Complete your profile
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="inline-flex items-center justify-center px-6 py-2 border rounded-full border-primary/20 bg-primary/5">
              <span className="mr-2 font-medium text-primary">Step 3</span>
              <span className="text-primary/80">of 3</span>
              <span className="ml-3 text-sm text-muted-foreground">
                • Complete profile
              </span>
            </div>
          </motion.div>

          {/* Role Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="p-2 rounded-full bg-primary/10">
              {selectedRole === "artist" ? (
                <Palette className="w-5 h-5 text-primary" />
              ) : (
                <Sparkles className="w-5 h-5 text-primary" />
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              You are registering as a{" "}
              <span className="font-medium text-foreground">
                {selectedRole === "artist" ? "Beauty Artist" : "Member"}
              </span>
            </span>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border rounded-lg border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border rounded-lg border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 border rounded-lg border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {selectedRole === "artist" && (
                <>
                  <div>
                    <label
                      htmlFor="specializations"
                      className="block mb-2 text-sm font-medium text-foreground"
                    >
                      Specializations
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Hair Styling",
                        "Makeup",
                        "Nails",
                        "Skincare",
                        "Lashes",
                        "Brows",
                      ].map((specialization) => (
                        <label
                          key={specialization}
                          className="flex items-center p-3 border rounded-lg cursor-pointer border-input bg-background hover:bg-accent"
                        >
                          <input
                            type="checkbox"
                            name="specializations"
                            value={specialization}
                            className="mr-2"
                          />
                          <span className="text-sm">{specialization}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-foreground"
                    >
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="experience"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg border-input bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instagram"
                      className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground"
                    >
                      Instagram Profile
                      <span className="text-xs text-muted-foreground">
                        (Optional)
                      </span>
                    </label>
                    <div className="flex items-center border rounded-lg border-input bg-background focus-within:ring-2 focus-within:ring-primary/20">
                      <span className="pl-4 text-muted-foreground">@</span>
                      <input
                        type="text"
                        id="instagram"
                        placeholder="your.profile"
                        className="w-full px-2 py-2 bg-transparent border-0 rounded-lg text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 text-base font-medium transition-all rounded-lg shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl"
              >
                Complete Registration
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
