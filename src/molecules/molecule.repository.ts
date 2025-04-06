import {PrismaClient} from "../../generated/prisma";
import {Molecule} from "./molecule.model";

const prisma = new PrismaClient();

export const findMolecules = async () => {
    return await prisma.molecule.findMany() as Molecule[]
}

export const findMoleculeById = async (id: number) => {
    return await prisma.molecule.findUnique({
        where: {id}
    }) as Molecule
}
