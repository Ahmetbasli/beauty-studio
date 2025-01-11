import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  User,
} from "lucide-react";

// Mock data for earnings
const mockEarnings = {
  totalEarnings: "Rp 12.500.000",
  thisMonth: "Rp 2.800.000",
  lastMonth: "Rp 2.200.000",
  percentageChange: 27.3,
  recentTransactions: [
    {
      id: 1,
      customerName: "Sophie Brown",
      customerImage: "https://i.pravatar.cc/150?img=2",
      services: ["Makeup", "Hair Styling"],
      amount: "Rp 650.000",
      date: "Today",
      time: "4:30 PM",
      status: "completed",
    },
    {
      id: 2,
      customerName: "Rachel Kim",
      customerImage: "https://i.pravatar.cc/150?img=5",
      services: ["Nail Art", "Hand Spa"],
      amount: "Rp 550.000",
      date: "Today",
      time: "1:30 PM",
      status: "completed",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      customerImage: "https://i.pravatar.cc/150?img=3",
      services: ["Hair Styling", "Hair Treatment"],
      amount: "Rp 550.000",
      date: "Yesterday",
      time: "11:00 AM",
      status: "completed",
    },
  ],
  statistics: {
    totalBookings: 45,
    completedBookings: 42,
    cancelledBookings: 3,
    averageRating: 4.8,
    totalReviews: 38,
  },
};

const TransactionCard = ({ transaction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-xl border border-border/40"
  >
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-3 items-center">
        <img
          src={transaction.customerImage}
          alt={transaction.customerName}
          className="object-cover w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium">{transaction.customerName}</h3>
          <p className="text-sm text-muted-foreground">
            {transaction.services.join(", ")}
          </p>
        </div>
      </div>
      <span className="font-medium">{transaction.amount}</span>
    </div>
    <div className="flex justify-between items-center text-sm text-muted-foreground">
      <div className="flex gap-2 items-center">
        <Calendar className="w-4 h-4" />
        <span>{transaction.date}</span>
      </div>
      <div className="flex gap-2 items-center">
        <Clock className="w-4 h-4" />
        <span>{transaction.time}</span>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="p-4 rounded-xl border border-border/40">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const ArtistEarnings = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/artist/dashboard")}
              className="p-2 rounded-lg transition-colors hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Earnings</h1>
            <div className="w-9" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Earnings Overview */}
        <div className="p-4 mb-6 rounded-xl border border-border/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Total Earnings</h2>
            <button className="flex gap-1 items-center px-3 py-1.5 text-sm rounded-lg transition-colors hover:bg-accent">
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-semibold">{mockEarnings.thisMonth}</p>
            <div className="flex gap-2 items-center mt-1">
              {mockEarnings.percentageChange >= 0 ? (
                <div className="flex gap-1 items-center text-sm text-emerald-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+{mockEarnings.percentageChange}%</span>
                </div>
              ) : (
                <div className="flex gap-1 items-center text-sm text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>{mockEarnings.percentageChange}%</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">
                vs last month
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/artist/withdrawal")}
            className="w-full py-3 font-medium text-white rounded-xl bg-primary hover:bg-primary/90 transition-colors"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            title="Total Bookings"
            value={mockEarnings.statistics.totalBookings}
            icon={Calendar}
          />
          <StatCard
            title="Completed"
            value={mockEarnings.statistics.completedBookings}
            icon={Calendar}
          />
          <StatCard
            title="Average Rating"
            value={mockEarnings.statistics.averageRating}
            icon={Calendar}
          />
          <StatCard
            title="Total Reviews"
            value={mockEarnings.statistics.totalReviews}
            icon={User}
          />
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
          {mockEarnings.recentTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistEarnings;
