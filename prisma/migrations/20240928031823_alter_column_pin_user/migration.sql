/*
  Warnings:

  - The `pin` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "deleted_at" SET NOT NULL,
DROP COLUMN "pin",
ADD COLUMN     "pin" INTEGER;
