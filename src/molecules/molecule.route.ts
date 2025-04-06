import {Router} from 'express';
import {
    createMoleculeHandler,
    getAllMoleculesHandler,
    getMoleculeByIdHandler,
    getMoleculeModelHandler,
} from './molecule.controller';
import {body, param} from "express-validator";

const router = Router();

/**
 * Validators
 */

// Create molecule validator
export const validateCreateMolecule = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),

    body('model')
        .optional()
        .isString().withMessage('model must be a string'),
];

/**
 * Molecule API Routes
 *
 * This router handles the retrieval of molecules and their associated 3D models.
 */

// POST /molecule/
// Creates a new molecule
router.post('/', createMoleculeHandler);

// GET /molecules/
// Returns a list of all molecules
router.get('/',
    validateCreateMolecule,
    getAllMoleculesHandler);

// GET /molecules/:id/model
// Returns the 3D model file associated with a molecule (if available)
router.get('/:id/model',
    param('id').isInt().withMessage('ID must be an integer'),
    getMoleculeModelHandler);

// GET /molecules/:id
// Returns details of a single molecule by ID
router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    getMoleculeByIdHandler);


export default router;
