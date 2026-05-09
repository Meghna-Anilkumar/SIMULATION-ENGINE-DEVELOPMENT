import { Router } from 'express';
import { SimulationController } from '../controllers/SimulationController';
import { SimulationRoutes } from '../constants/routeConstants';
import { validateBody } from '../middlewares/validate';
import { RunStepDto } from '../dtos/Simulation';

const router = Router();
const controller = new SimulationController();

router.post(SimulationRoutes.STEP, validateBody(RunStepDto), controller.runStep);
router.get(SimulationRoutes.HISTORY, controller.getHistory);
router.post(SimulationRoutes.RESET, controller.reset);

export default router;