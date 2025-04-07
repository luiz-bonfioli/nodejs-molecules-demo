import {
    getAllMoleculesHandler,
    getMoleculeByIdHandler,
    getMoleculeModelHandler
} from '../src/molecules/molecule.controller';

import * as moleculeService from '../src/molecules/molecule.service';
import {Molecule} from "../src/molecules/molecule.model";

const mockRequest = (params = {}) => ({
    params
}) as any;

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.sendFile = jest.fn().mockImplementation((_path: string, cb?: Function) => cb?.());
    return res;
};

const mockNext = jest.fn();

describe('Molecule Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMoleculesHandler', () => {
        it('should return all molecules', async () => {
            const molecules: Molecule[] = [{
                id: 1, name: 'Water',
                model: 'model.tst'
            }];
            jest.spyOn(moleculeService, 'getMolecules').mockResolvedValue(molecules);

            const req = mockRequest();
            const res = mockResponse();

            await getAllMoleculesHandler(req, res, mockNext);

            expect(res.json).toHaveBeenCalledWith(molecules);
        });

        it('should call next on error', async () => {
            const error = new Error('DB error');
            jest.spyOn(moleculeService, 'getMolecules').mockRejectedValue(error);

            const req = mockRequest();
            const res = mockResponse();

            await getAllMoleculesHandler(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getMoleculeByIdHandler', () => {
        it('should return molecule if found', async () => {
            const molecule: Molecule = {id: 1, name: 'Methane', model: 'model.tst'};
            jest.spyOn(moleculeService, 'getMoleculeById').mockResolvedValue(molecule);

            const req = mockRequest({id: '1'});
            const res = mockResponse();

            await getMoleculeByIdHandler(req, res, mockNext);

            expect(res.json).toHaveBeenCalledWith(molecule);
        });

        it('should return 404 if molecule not found', async () => {
            jest.spyOn(moleculeService, 'getMoleculeById').mockResolvedValue(undefined);

            const req = mockRequest({id: '999'});
            const res = mockResponse();

            await getMoleculeByIdHandler(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Molecule not found'});
        });

        it('should call next on error', async () => {
            const error = new Error('Service failure');
            jest.spyOn(moleculeService, 'getMoleculeById').mockRejectedValue(error);

            const req = mockRequest({id: '1'});
            const res = mockResponse();

            await getMoleculeByIdHandler(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getMoleculeModelHandler', () => {
        it('should send file if model path is found', async () => {
            jest.spyOn(moleculeService, 'getMoleculeModelById').mockResolvedValue('/path/to/model.glb');

            const req = mockRequest({id: '1'});
            const res = mockResponse();

            await getMoleculeModelHandler(req, res, mockNext);

            expect(res.sendFile).toHaveBeenCalledWith('/path/to/model.glb', expect.any(Function));
        });

        it('should return 404 if model path is not found', async () => {
            jest.spyOn(moleculeService, 'getMoleculeModelById').mockResolvedValue(undefined);

            const req = mockRequest({id: '1'});
            const res = mockResponse();

            await getMoleculeModelHandler(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Molecule model not found'});
        });

        it('should call next on sendFile error', async () => {
            jest.spyOn(moleculeService, 'getMoleculeModelById').mockResolvedValue('/invalid/path');

            const req = mockRequest({id: '1'});
            const res = {
                ...mockResponse(),
                sendFile: jest.fn((_path: string, cb?: Function) => cb?.(new Error('File error')))
            };

            await getMoleculeModelHandler(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });

        it('should call next on service error', async () => {
            const error = new Error('Service failure');
            jest.spyOn(moleculeService, 'getMoleculeModelById').mockRejectedValue(error);

            const req = mockRequest({id: '1'});
            const res = mockResponse();

            await getMoleculeModelHandler(req, res, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
