-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'RESELLER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
