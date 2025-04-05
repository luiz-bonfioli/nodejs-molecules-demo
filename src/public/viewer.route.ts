import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/viewer.html');
});

export default router;
