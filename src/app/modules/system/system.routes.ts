import express from 'express';
import adminAuth from '../../middlewares/adminAuth';
import SystemControllers from './system.controllers';

const router = express.Router();

router.get('/dashboard', adminAuth(), SystemControllers.getDashboardStates);
router.delete('/image/:publicId', adminAuth(), SystemControllers.deleteImage);

const SystemRoutes = router;

export default SystemRoutes;
