import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack } from "react-icons/io5";
import {
  FaWallet,
  FaUniversity,
  FaCreditCard,
  FaGoogleWallet,
  FaMoneyBillWave,
} from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";
import { BsBank, BsBank2 } from "react-icons/bs";
import { Check, Calendar, Clock, MapPin } from "lucide-react";

const paymentMethods = {
  eWallets: [
    { id: 1, name: "GoPay", balance: "Rp 500.000", image: "/images/gopay.png" },
    { id: 2, name: "OVO", balance: "Rp 750.000", image: "/images/ovo.png" },
    { id: 3, name: "DANA", balance: "Rp 300.000", image: "/images/dana.png" },
  ],
  bankTransfer: [
    { id: 4, name: "BCA", accountNo: "1234567890", image: "/images/bca.png" },
    {
      id: 5,
      name: "Mandiri",
      accountNo: "0987654321",
      image: "/images/mandiri.png",
    },
    { id: 6, name: "BNI", accountNo: "5678901234", image: "/images/bni.png" },
  ],
  creditCards: [
    { id: 7, name: "Visa", image: "/images/visa.png" },
    { id: 8, name: "Mastercard", image: "/images/mastercard.png" },
  ],
};

const PaymentSuccessView = ({ navigate }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
  >
    <div className="w-full max-w-md p-6 bg-white rounded-2xl">
      <div className="flex flex-col items-center text-center">
        {/* Success Animation */}
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Check className="w-8 h-8 text-primary" />
          </motion.div>
        </div>

        <h2 className="mb-2 text-2xl font-semibold">Payment Successful!</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          We're waiting for the artist to confirm your booking
        </p>

        {/* Status Badge */}
        <div className="w-full p-3 mb-6 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Artist has 15 minutes to respond
          </div>
        </div>

        {/* Booking Details */}
        <div className="w-full p-4 mb-6 space-y-3 border rounded-xl border-border/40 bg-accent/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Aug 15, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>10:00 AM</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Sarah Mitchell's Studio, Denpasar</span>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="w-full p-4 mb-6 text-left border rounded-xl border-border/40">
          <h3 className="mb-3 font-medium">What's next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5 p-1 mt-0.5 rounded-full bg-primary/10">
                <div className="w-full h-full rounded-full bg-primary" />
              </div>
              The artist will confirm your booking within 15 minutes
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5 p-1 mt-0.5 rounded-full bg-primary/10">
                <div className="w-full h-full rounded-full bg-primary" />
              </div>
              If no response, booking will be automatically cancelled and
              refunded
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5 p-1 mt-0.5 rounded-full bg-primary/10">
                <div className="w-full h-full rounded-full bg-primary" />
              </div>
              Once confirmed, you'll receive a notification and reminder 24h
              before
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid w-full gap-3">
          <button
            onClick={() => navigate("/bookings")}
            className="w-full py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 font-medium transition-colors rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const PaymentInstructionsModal = ({
  isOpen,
  onClose,
  selectedMethod,
  onPaymentComplete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md p-6 mx-4 bg-white rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-semibold">Payment Instructions</h3>
        <div className="mb-6">
          <p className="mb-2">
            To complete your payment with {selectedMethod?.name}:
          </p>
          <ol className="pl-6 list-decimal">
            <li className="mb-2">Open your {selectedMethod?.name} app</li>
            <li className="mb-2">Select "Pay" or "Transfer"</li>
            <li className="mb-2">Enter the amount: Rp 500.000</li>
            {selectedMethod?.accountNo && (
              <li className="mb-2">
                Enter account number: {selectedMethod.accountNo}
              </li>
            )}
            <li className="mb-2">Confirm and complete the payment</li>
          </ol>
        </div>
        <div className="grid gap-3">
          <button
            onClick={onPaymentComplete}
            className="w-full py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
          >
            I've Completed the Payment
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 font-medium transition-colors rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const PaymentMethodSection = ({ title, icon: Icon, methods, onSelect }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4 gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="grid gap-4">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method)}
          className="flex items-center justify-between w-full p-4 transition-colors bg-white rounded-xl hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
            <div className="text-left">
              <p className="font-medium">{method.name}</p>
              {method.balance && (
                <p className="text-sm text-gray-500">{method.balance}</p>
              )}
              {method.accountNo && (
                <p className="text-sm text-gray-500">
                  Account: {method.accountNo}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowInstructions(true);
  };

  const handlePaymentComplete = () => {
    setShowInstructions(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-16 px-4 border-b">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 transition-colors rounded-full hover:bg-gray-100"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-lg font-semibold">Payment</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Booking Summary */}
        <div className="p-4 mb-6 bg-white rounded-xl">
          <h2 className="mb-4 text-lg font-semibold">Booking Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">Hair Styling</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Artist</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium">Aug 15, 2024 10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium">1 hour</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-primary">Rp 500.000</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <PaymentMethodSection
          title="E-Wallets"
          icon={FaWallet}
          methods={paymentMethods.eWallets}
          onSelect={handleMethodSelect}
        />
        <PaymentMethodSection
          title="Bank Transfer"
          icon={FaUniversity}
          methods={paymentMethods.bankTransfer}
          onSelect={handleMethodSelect}
        />
        <PaymentMethodSection
          title="Credit Cards"
          icon={FaCreditCard}
          methods={paymentMethods.creditCards}
          onSelect={handleMethodSelect}
        />
      </div>

      <PaymentInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        selectedMethod={selectedMethod}
        onPaymentComplete={handlePaymentComplete}
      />

      <AnimatePresence>
        {showSuccess && <PaymentSuccessView navigate={navigate} />}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
