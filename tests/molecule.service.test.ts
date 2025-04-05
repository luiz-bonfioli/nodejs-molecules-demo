import path from 'node:path';
import {getMoleculeById, getMoleculeModelById, getMolecules} from '../src/molecules/molecule.service';
import {Molecule} from "../src/molecules/molecule.model";

describe('Molecule Service', () => {
    describe('getMolecules', () => {
        it('should return all molecules', async () => {
            const result: Molecule[] = await getMolecules();
            expect(result).toHaveLength(5);
            expect(result.map(m => m.id)).toEqual(['1', '2', '3', '4', '5']);
        });
    });

    describe('getMoleculeById', () => {
        it('should return the molecule with the given ID', async () => {
            const result = await getMoleculeById('2');
            expect(result).toEqual({
                id: '2',
                name: 'Mol 2',
                model: 'water_molecule.glb',
            });
        });

        it('should return undefined if the molecule is not found', async () => {
            const result = await getMoleculeById('999');
            expect(result).toBeUndefined();
        });
    });

    describe('getMoleculeModelById', () => {
        it('should return the correct file path for an existing molecule with a model', async () => {
            const result = await getMoleculeModelById('1');
            const expectedPath = path.join(path.resolve(__dirname, '../'), '/src/public/models', 'glucose_molecule.glb');
            expect(result).toBe(expectedPath);
        });

        it('should return undefined if the molecule ID is invalid', async () => {
            const result = await getMoleculeModelById('999');
            expect(result).toBeUndefined();
        });

        it('should return undefined if the molecule does not have a model', async () => {
            // Spy on getMoleculeById to simulate a molecule with no model
            const spy = jest.spyOn(require('../src/molecules/molecule.service'), 'getMoleculeById');
            spy.mockResolvedValue({id: '10', name: 'Fake', model: undefined});

            const result = await getMoleculeModelById('10');
            expect(result).toBeUndefined();

            spy.mockRestore();
        });
    });
});
