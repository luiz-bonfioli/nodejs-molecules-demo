import {Molecule} from './molecule.model';
import path from "node:path";


// In-memory mock data representing molecules
const molecules: Molecule[] = [
    {id: '1', name: 'Mol 1', model: 'glucose_molecule.glb'},
    {id: '2', name: 'Mol 2', model: 'water_molecule.glb'},
    {id: '3', name: 'Mol 3', model: 'sucrose_molecule.glb'},
    {id: '4', name: 'Mol 4', model: 'cpk_molecule.glb'},
    {id: '5', name: 'Mol 5', model: 'glucose_molecule.glb'},
];

/**
 * Returns the full list of molecules.
 * This simulates a fetch from a database.
 */
export const getMolecules = async (): Promise<Molecule[]> => {
    return molecules;
};

/**
 * Returns a molecule by its ID, or undefined if not found.
 * @param id - The unique ID of the molecule to fetch.
 */
export const getMoleculeById = async (id: string): Promise<Molecule | undefined> => {
    return molecules.find((m) => m.id === id);
};

/**
 * Returns the absolute file path to the 3D model for a given molecule ID.
 * If the molecule or its model is not found, returns undefined.
 * @param id - The ID of the molecule whose model path is requested.
 */
export const getMoleculeModelById = async (id: string): Promise<string | undefined> => {
    const molecule = await getMoleculeById(id);
    if (!molecule?.model) return undefined;

    return  path.join(path.resolve(__dirname, '../'), 'public/models', molecule?.model);

    // return __dirname + '/models' + molecule.model;
};
