export interface Booking {
  id: string;
  userMobile: string;
  propertyId: string;
  propertyTitle: string;
  city: string;
  price: number;
  checkin: string;
  checkout: string;
  createdAt: string;
}

export function getBookings(): Booking[] {
  const data = localStorage.getItem("sf_bookings");
  return data ? JSON.parse(data) : [];
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): string | null {
  const bookings = getBookings();
  const overlap = bookings.some(
    (b) =>
      b.propertyId === booking.propertyId &&
      booking.checkin <= b.checkout &&
      booking.checkout >= b.checkin
  );
  if (overlap) return "These dates are already booked";
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem("sf_bookings", JSON.stringify(bookings));
  return null;
}

export function getMessages(): { name: string; email: string; message: string; date: string }[] {
  const data = localStorage.getItem("sf_messages");
  return data ? JSON.parse(data) : [];
}

export function addMessage(msg: { name: string; email: string; message: string }) {
  const msgs = getMessages();
  msgs.push({ ...msg, date: new Date().toISOString() });
  localStorage.setItem("sf_messages", JSON.stringify(msgs));
}
