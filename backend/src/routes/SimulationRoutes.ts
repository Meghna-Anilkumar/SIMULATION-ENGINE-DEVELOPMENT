import { Router } from 'express';
import { SimulationController } from '../controllers/SimulationController';
import { SimulationRoutes } from '../constants/routeConstants';

const router = Router();
const controller = new SimulationController();

router.post(SimulationRoutes.STEP, controller.runStep);
router.get(SimulationRoutes.HISTORY, controller.getHistory);
router.post(SimulationRoutes.RESET, controller.reset);

export default router;