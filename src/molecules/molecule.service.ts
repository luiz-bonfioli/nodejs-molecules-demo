import {Molecule} from './molecule.model';
import {createMolecule, findMolecules, findMoleculeById} from './molecule.repository'
import path from "node:path";

/**
 * Saves a new molecule.
 *
 * @param molecule - The molecule object.
 * @returns The new molecule.
 */
export const saveMolecule = async (molecule: Molecule): Promise<Molecule> => {
    return createMolecule(molecule);
}

/**
 * Returns the full list of molecules.
 * This simulates a fetch from a database.
 */
export const getMolecules = async (): Promise<Molecule[]> => {
    return findMolecules();
}

/**
 * Returns a molecule by its ID, or undefined if not found.
 * @param id - The unique ID of the molecule to fetch.
 */
export const getMoleculeById = async (id: number): Promise<Molecule | undefined> => {
    return await findMoleculeById(id);
}

/**
 * Returns the absolute file path to the 3D model for a given molecule ID.
 * If the molecule or its model is not found, returns undefined.
 * @param id - The ID of the molecule whose model path is requested.
 */
export const getMoleculeModelById = async (id: number): Promise<string | undefined> => {
    const molecule = await getMoleculeById(id);
    if (!molecule?.model) return undefined;

    return path.join(path.resolve(__dirname, '../'), 'public/models', molecule?.model);
}
