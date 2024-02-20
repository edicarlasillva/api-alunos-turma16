-- CreateTable
CREATE TABLE "assessments" (
    "id" UUID NOT NULL,
    "discipline" VARCHAR(60) NOT NULL,
    "grade" DECIMAL(4,2) NOT NULL,
    "crated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_student" UUID NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
