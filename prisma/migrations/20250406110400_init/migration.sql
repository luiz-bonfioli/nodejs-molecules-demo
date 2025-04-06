-- CreateTable
CREATE TABLE "Molecule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Molecule_name_key" ON "Molecule"("name");
