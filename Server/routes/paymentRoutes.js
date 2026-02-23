import express from 'express';
import {
  getPayments,
  getPaymentsByFee,
  createPayment,
  updatePaymentStatus,
  deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Routes
router.get('/', getPayments);                 
router.get('/fee/:fee_id', getPaymentsByFee); 
router.post('/', createPayment);            
router.put('/status', updatePaymentStatus);  
router.delete('/:payment_id', deletePayment);

export default router;
