/*
  Warnings:

  - You are about to drop the column `city` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zip";

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
