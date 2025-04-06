import {NextFunction, Request, Response} from 'express';
import {getMoleculeById, getMoleculeModelById, getMolecules} from './molecule.service';
import {validationResult} from "express-validator";

// Handler to get all molecules
export const getAllMoleculesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const molecules = await getMolecules();
        res.json(molecules);
    } catch (error) {
        next(error);
    }
};

// Handler to get a single molecule by ID
export const getMoleculeByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }

        const molecule = await getMoleculeById(Number(req.params.id));
        if (molecule) {
            res.json(molecule);
        } else {
            res.status(404).json({message: 'Molecule not found'});
        }
    } catch (error) {
        next(error);
    }
};

// Handler to get the 3D model file path of a molecule by ID and send the file
export const getMoleculeModelHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }

        const modelPath = await getMoleculeModelById(Number(req.params.id));
        if (modelPath) {
            res.sendFile(modelPath, (err) => {
                if (err) {
                    next(err);
                }
            });
        } else {
            res.status(404).json({message: 'Molecule model not found'});
        }
    } catch (error) {
        next(error);
    }
};
