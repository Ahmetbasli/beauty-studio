import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, X } from "lucide-react";

const CancellationReasons = {
  artistReasons: [
    {
      id: "schedule_conflict",
      label: "Schedule conflict",
      description: "Double booking or unexpected schedule change",
    },
    {
      id: "emergency",
      label: "Emergency",
      description: "Personal or family emergency",
    },
    {
      id: "equipment_issues",
      label: "Equipment issues",
      description: "Problems with tools or equipment",
    },
    {
      id: "health_reasons",
      label: "Health reasons",
      description: "Unable to provide service due to health",
    },
    {
      id: "artist_other",
      label: "Other artist-related reason",
      description: "Please specify the reason below",
    },
  ],
  memberReasons: [
    {
      id: "inappropriate_behavior",
      label: "Inappropriate behavior",
      description: "Member has shown inappropriate or disrespectful behavior",
    },
    {
      id: "communication_issues",
      label: "Communication issues",
      description: "Unable to reach or communicate effectively with member",
    },
    {
      id: "service_mismatch",
      label: "Service mismatch",
      description: "Member's requirements don't match the service offered",
    },
    {
      id: "safety_concerns",
      label: "Safety concerns",
      description: "Concerns about safety or security",
    },
    {
      id: "member_other",
      label: "Other member-related reason",
      description: "Please specify the reason below",
    },
  ],
};

const getWarningMessage = (selectedReason) => {
  if (!selectedReason) return null;

  const category = Object.entries(CancellationReasons).find(([_, reasons]) =>
    reasons.some((reason) => reason.id === selectedReason)
  )?.[0];

  switch (category) {
    case "artistReasons":
      return {
        title: "Artist-Related Cancellation",
        message:
          "You will be penalized for this cancellation and the customer will be refunded.",
      };
    case "memberReasons":
      return {
        title: "Member-Related Cancellation",
        message:
          "The member will not receive a refund and may get a negative rating.",
      };
    default:
      return null;
  }
};

const ArtistBookingCancellation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    const selectedCategory = Object.entries(CancellationReasons).find(
      ([_, reasons]) => reasons.some((reason) => reason.id === selectedReason)
    )?.[0];

    const reason = {
      id: selectedReason,
      category: selectedCategory,
      details: selectedReason === "other" ? otherReason : undefined,
    };

    console.log("Cancelled booking:", id, "Reason:", reason);
    navigate("/artist/bookings");
  };

  const getReasonDetails = (reasonId) => {
    return Object.values(CancellationReasons)
      .flat()
      .find((reason) => reason.id === reasonId);
  };

  const warningMessage = getWarningMessage(selectedReason);

  const needsExplanation = selectedReason?.endsWith("_other");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg transition-colors hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium">Cancel Booking</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Cancellation Form */}
        <div className="p-4 mb-6 space-y-6 border rounded-xl border-border/40">
          <h2 className="font-medium">Select Cancellation Reason</h2>

          {/* Artist Reasons */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Artist Related
            </h3>
            <div className="space-y-2">
              {CancellationReasons.artistReasons.map((reason) => (
                <label
                  key={reason.id}
                  className="flex items-start p-3 cursor-pointer rounded-lg transition-colors hover:bg-accent"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 mt-1 text-primary border-border/40"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">{reason.label}</span>
                    <span className="block mt-1 text-sm text-muted-foreground">
                      {reason.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Member Reasons */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Member Related
            </h3>
            <div className="space-y-2">
              {CancellationReasons.memberReasons.map((reason) => (
                <label
                  key={reason.id}
                  className="flex items-start p-3 cursor-pointer rounded-lg transition-colors hover:bg-accent"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 mt-1 text-primary border-border/40"
                  />
                  <div className="ml-3">
                    <span className="block font-medium">{reason.label}</span>
                    <span className="block mt-1 text-sm text-muted-foreground">
                      {reason.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {needsExplanation && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Please specify the reason
              </label>
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter your reason here..."
                className="w-full p-3 min-h-[100px] rounded-lg border transition-colors border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>

        {/* Warning Message Before Cancel Button */}
        {selectedReason && (
          <div className="flex items-start gap-3 p-4 mb-6 text-sm border rounded-xl border-amber-200 bg-amber-50 text-amber-700">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{warningMessage?.title}</p>
              <p className="mt-1">{warningMessage?.message}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid gap-3">
          <button
            onClick={() => setShowConfirmation(true)}
            disabled={!selectedReason || (needsExplanation && !otherReason)}
            className="flex gap-2 justify-center items-center py-3 font-medium text-white rounded-xl transition-colors bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
            Cancel Booking
          </button>
          <button
            onClick={() => navigate(-1)}
            className="py-3 font-medium rounded-xl transition-colors hover:bg-accent"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowConfirmation(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm p-6 mx-4 bg-background rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#D4B48D]">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Confirm Cancellation
              </h3>
              <p className="mb-6 text-base text-[#6B7280]">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
              <div className="grid w-full grid-cols-2 gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="py-3 font-medium border rounded-xl hover:bg-accent"
                >
                  Go Back
                </button>
                <button
                  onClick={handleCancel}
                  className="py-3 font-medium text-white rounded-xl bg-red-600 hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ArtistBookingCancellation;
