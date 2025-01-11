import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building,
  Wallet,
  ChevronRight,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";

const mockData = {
  availableBalance: "Rp 2.800.000",
  withdrawalMethods: [
    {
      id: 1,
      type: "bank",
      name: "Bank Transfer",
      accountNumber: "****3456",
      bankName: "Bank Central Asia",
      isDefault: true,
    },
    {
      id: 2,
      type: "ewallet",
      name: "GoPay",
      accountNumber: "****7890",
      isDefault: false,
    },
  ],
  withdrawalHistory: [
    {
      id: 1,
      amount: "Rp 1.500.000",
      method: "Bank Transfer - BCA",
      status: "completed",
      date: "Mar 15, 2024",
      time: "14:30",
    },
    {
      id: 2,
      amount: "Rp 800.000",
      method: "GoPay",
      status: "processing",
      date: "Mar 10, 2024",
      time: "09:15",
    },
  ],
};

const WithdrawModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(
    mockData.withdrawalMethods[0]
  );
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg mx-4 bg-background rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-border/40">
          <h2 className="text-lg font-medium">Withdraw Funds</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {step === 1 ? (
            <>
              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 text-lg font-medium rounded-xl border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary font-medium"
                    onClick={() =>
                      setAmount(mockData.availableBalance.replace("Rp ", ""))
                    }
                  >
                    Max
                  </button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Available balance: {mockData.availableBalance}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Withdrawal Method
                </label>
                <div className="space-y-3">
                  {mockData.withdrawalMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`p-3 rounded-xl border cursor-pointer ${
                        selectedMethod.id === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border/40 hover:bg-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {method.type === "bank" ? (
                          <div className="p-2 rounded-xl bg-primary/10">
                            <Building className="w-5 h-5 text-primary" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-primary/10">
                            <Wallet className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.accountNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-accent/50 mb-6">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    A service fee of Rp 6.500 will be deducted from your
                    withdrawal amount
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!amount || !selectedMethod}
                className="w-full py-3 font-medium text-white rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-medium mb-4">Confirm Withdrawal</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">Rp {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">Rp 6.500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      You'll Receive
                    </span>
                    <span className="font-medium">
                      Rp {parseInt(amount.replace(/\D/g, "")) - 6500}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border/40">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">{selectedMethod.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-accent/50 mb-6">
                <div className="flex gap-2 items-start">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your withdrawal will be processed within 1-3 business days
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full py-3 font-medium text-white rounded-xl bg-primary hover:bg-primary/90"
                >
                  Confirm Withdrawal
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 font-medium rounded-xl border border-border/40 hover:bg-accent/50"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const WithdrawalMethodCard = ({ method }) => (
  <div className="p-4 rounded-xl border border-border/40">
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-3 items-center">
        {method.type === "bank" ? (
          <div className="p-2 rounded-xl bg-primary/10">
            <Building className="w-5 h-5 text-primary" />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-primary/10">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-medium">{method.name}</h3>
          <p className="text-sm text-muted-foreground">
            {method.accountNumber}
          </p>
        </div>
      </div>
      {method.isDefault && (
        <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
          Default
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground">{method.bankName}</p>
  </div>
);

const WithdrawalHistoryCard = ({ transaction }) => {
  const getStatusStyles = () => {
    switch (transaction.status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 rounded-xl border border-border/40">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{transaction.amount}</span>
        <span
          className={`px-2.5 py-0.5 text-xs font-medium border rounded-full ${getStatusStyles()}`}
        >
          {transaction.status.charAt(0).toUpperCase() +
            transaction.status.slice(1)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{transaction.method}</p>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex gap-2 items-center">
          <Clock className="w-4 h-4" />
          <span>{transaction.date}</span>
        </div>
        <span>{transaction.time}</span>
      </div>
    </div>
  );
};

const ArtistWithdrawal = () => {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/artist/earnings")}
              className="p-2 rounded-lg hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Withdraw</h1>
            <div className="w-9" />
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <div className="p-4 mb-6 rounded-xl border border-border/40">
          <p className="text-sm text-muted-foreground mb-1">
            Available Balance
          </p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">
              {mockData.availableBalance}
            </p>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2 font-medium text-white rounded-xl bg-primary hover:bg-primary/90"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="p-4 mb-6 space-y-3 text-sm rounded-xl border border-border/40 bg-accent/50">
          <div className="flex gap-2 items-start text-muted-foreground">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <p>Minimum withdrawal amount: Rp 100.000</p>
          </div>
          <div className="flex gap-2 items-start text-muted-foreground">
            <Clock className="w-4 h-4 mt-0.5" />
            <p>Processing time: 1-3 business days</p>
          </div>
          <div className="flex gap-2 items-start text-muted-foreground">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <p>Service fee: Rp 6.500 per withdrawal</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Withdrawal Methods</h2>
            <button className="flex items-center text-sm text-primary">
              Add new
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {mockData.withdrawalMethods.map((method) => (
              <WithdrawalMethodCard key={method.id} method={method} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Withdrawal History</h2>
          <div className="space-y-4">
            {mockData.withdrawalHistory.map((transaction) => (
              <WithdrawalHistoryCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showWithdrawModal && (
          <WithdrawModal
            isOpen={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistWithdrawal;
