import { Router } from 'express';
import { getBalanceSheet } from './controllers';

const router = Router();

router.get('/balance-sheet', getBalanceSheet);

export default router;
