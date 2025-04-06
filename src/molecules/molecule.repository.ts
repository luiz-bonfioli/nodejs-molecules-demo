import {PrismaClient} from "../../generated/prisma";
import {Molecule} from "./molecule.model";

// Instantiate the Prisma client to interact with the database
const prisma = new PrismaClient();

/**
 * Creates a new molecule.
 *
 * @param molecule - The molecule data.
 * @returns The new molecule.
 */
export const createMolecule = async (molecule: Molecule): Promise<Molecule> => {
    return await prisma.molecule.create({
        data: {
            id: molecule.id,
            name: molecule.name,
            model: molecule.model
        }
    }) as Molecule;
};

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
