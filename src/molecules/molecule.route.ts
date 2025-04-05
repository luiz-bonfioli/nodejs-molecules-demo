import { Router } from 'express';
import {
    getAllMoleculesHandler,
    getMoleculeByIdHandler,
    getMoleculeModelHandler,
} from './molecule.controller';

const router = Router();

/**
 * Molecule API Routes
 *
 * This router handles the retrieval of molecules and their associated 3D models.
 */

// GET /molecules/
// Returns a list of all molecules
router.get('/', getAllMoleculesHandler);

// GET /molecules/:id/model
// Returns the 3D model file associated with a molecule (if available)
router.get('/:id/model', getMoleculeModelHandler);

// GET /molecules/:id
// Returns details of a single molecule by ID
router.get('/:id', getMoleculeByIdHandler);

export default router;
