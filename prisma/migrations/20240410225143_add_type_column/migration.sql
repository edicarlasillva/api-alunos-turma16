-- AlterTable
ALTER TABLE "students" ADD COLUMN     "type" VARCHAR(1) NOT NULL DEFAULT 'M';

-- CreateTable
CREATE TABLE "classes" (
    "id" UUID NOT NULL,
    "program" VARCHAR(60) NOT NULL,
    "edition" VARCHAR(60) NOT NULL,
    "max_students" INTEGER NOT NULL,
    "min_students" INTEGER NOT NULL,
    "crated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id_student" UUID NOT NULL,
    "id_class" UUID NOT NULL,
    "crated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id_student","id_class")
);

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
