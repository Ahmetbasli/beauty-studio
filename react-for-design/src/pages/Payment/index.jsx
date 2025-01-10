import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoChevronBack } from "react-icons/io5";
import { FaWallet, FaUniversity, FaCreditCard } from "react-icons/fa";

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

const PaymentInstructionsModal = ({ isOpen, onClose, selectedMethod }) => {
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
        <button
          onClick={onClose}
          className="w-full py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
        >
          Close
        </button>
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

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowInstructions(true);
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
      />
    </div>
  );
};

export default Payment;
