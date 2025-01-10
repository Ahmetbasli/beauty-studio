// Helper function to generate time slots
export const generateAvailableTimeSlots = (
  date,
  workingHours,
  serviceDuration,
  existingBookings = []
) => {
  const slots = [];
  const [startHour, startMinute] = workingHours.start.split(":").map(Number);
  const [endHour, endMinute] = workingHours.end.split(":").map(Number);

  const startTime = new Date(date);
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endHour, endMinute, 0, 0);

  const slotDuration = serviceDuration;
  let currentTime = startTime;

  while (currentTime < endTime) {
    const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);

    // Check if slot overlaps with breaks
    const isBreak = workingHours.breaks.some(({ start, end }) => {
      const breakStart = new Date(date);
      const [bStartHour, bStartMinute] = start.split(":").map(Number);
      breakStart.setHours(bStartHour, bStartMinute, 0, 0);

      const breakEnd = new Date(date);
      const [bEndHour, bEndMinute] = end.split(":").map(Number);
      breakEnd.setHours(bEndHour, bEndMinute, 0, 0);

      return currentTime < breakEnd && slotEnd > breakStart;
    });

    // Check if slot overlaps with existing bookings
    const isBooked = existingBookings.some(
      (booking) => currentTime < booking.endTime && slotEnd > booking.startTime
    );

    if (!isBreak && !isBooked && slotEnd <= endTime) {
      slots.push({
        id: `slot-${currentTime.getTime()}`,
        startTime: new Date(currentTime),
        endTime: slotEnd,
        status: "available",
        artistId: "mock-artist-id",
        duration: serviceDuration,
        breakdownTime: 15, // 15 minutes breakdown time between appointments
      });
    }

    // Move to next slot (30-minute intervals)
    currentTime = new Date(currentTime.getTime() + 30 * 60000);
  }

  return slots;
};

// Mock working hours for the week
export const mockWorkingHours = {
  0: {
    // Sunday
    start: "10:00",
    end: "18:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  1: {
    // Monday
    start: "09:00",
    end: "19:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  2: {
    // Tuesday
    start: "09:00",
    end: "19:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  3: {
    // Wednesday
    start: "09:00",
    end: "19:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  4: {
    // Thursday
    start: "09:00",
    end: "19:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  5: {
    // Friday
    start: "09:00",
    end: "19:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
  6: {
    // Saturday
    start: "10:00",
    end: "18:00",
    breaks: [{ start: "13:00", end: "14:00" }],
  },
};

// Mock existing bookings
export const mockExistingBookings = [
  {
    id: "booking-1",
    startTime: new Date(new Date().setHours(10, 0, 0, 0)),
    endTime: new Date(new Date().setHours(11, 0, 0, 0)),
    status: "booked",
    artistId: "mock-artist-id",
    serviceId: "service-1",
    customerId: "customer-1",
    duration: 60,
  },
  // Add more mock bookings as needed
];
