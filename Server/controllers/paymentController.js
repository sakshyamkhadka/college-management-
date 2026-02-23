import { db } from '../config/db.js';

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const [payments] = await db.execute(`
      SELECT * FROM Payments WHERE deleted_at IS NULL
    `);
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get payments by fee
export const getPaymentsByFee = async (req, res) => {
  const { fee_id } = req.params;
  try {
    const [payments] = await db.execute(`
      SELECT * FROM Payments 
      WHERE fee_id = ? AND deleted_at IS NULL
    `, [fee_id]);
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments by fee:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  const { fee_id, amount_paid } = req.body;
  const status = 'pending';
  const payment_date = new Date();

  try {
    const [result] = await db.execute(`
      INSERT INTO Payments (fee_id, amount_paid, status, payment_date)
      VALUES (?, ?, ?, ?)
    `, [fee_id, amount_paid, status, payment_date]);

    res.json({ 
      payment_id: result.insertId, 
      message: 'Payment created. Proceed with gateway payment.' 
    });
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  const { payment_id, status } = req.body;

  if (!['paid', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await db.execute(`
      UPDATE Payments SET status = ? WHERE payment_id = ?
    `, [status, payment_id]);

    res.json({ message: 'Payment status updated successfully.' });  
  } catch (err) {
    console.error('Error updating payment status:', err);
    res.status(500).json({ message: err.message });
  }
};

// Soft delete payment
export const deletePayment = async (req, res) => {
  const { payment_id } = req.params;

  try {
    await db.execute(`
      UPDATE Payments SET deleted_at = NOW() WHERE payment_id = ?
    `, [payment_id]);

    res.json({ message: 'Payment deleted successfully.' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ message: err.message });
  }
};
