"use server";

import { auth } from "@/lib/auth";
import { createBooking as createBookingService, cancelBooking as cancelBookingService } from "@/services/booking.service";

export async function createBooking(data: {
  tutorId: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
  price: number;
}) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const result = await createBookingService({
    studentId: session.user.id,
    ...data,
  });

  if (!result) return { error: "Failed to create booking" };
  return { success: true, bookingId: result.id };
}

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const result = await cancelBookingService(bookingId);
  if (!result) return { error: "Failed to cancel booking" };
  return { success: true };
}
