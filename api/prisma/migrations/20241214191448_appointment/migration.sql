-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Confirmed', 'Canceled', 'Completed');

-- CreateTable
CREATE TABLE "Appointments" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "symptom" TEXT NOT NULL,
    "appointment_dateTime" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);
