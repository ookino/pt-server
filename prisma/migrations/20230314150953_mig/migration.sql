/*
  Warnings:

  - Added the required column `category` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('FOR_SALE', 'FOR_RENT');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "category" "PropertyCategory" NOT NULL;
