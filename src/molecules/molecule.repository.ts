import {PrismaClient} from "../../generated/prisma";
import {Molecule} from "./molecule.model";

// Instantiate the Prisma client to interact with the database
const prisma = new PrismaClient();

/**
 * Retrieves all molecules from the database.
 *
 * @returns An array of Molecule objects.
 */
export const findMolecules = async () => {
    return await prisma.molecule.findMany() as Molecule[]
}

/**
 * Retrieves a specific molecule by its unique ID.
 *
 * @param id - The unique identifier of the molecule.
 * @returns A Molecule object if found, otherwise `undefined`.
 */
export const findMoleculeById = async (id: number) => {
    return await prisma.molecule.findUnique({
        where: {id}
    }) as Molecule
}
