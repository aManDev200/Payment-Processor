import Payment from '../models/paymentModel.js';
import Merchant from '../models/merchantModel.js';
import paymentProcessor from '../services/paymentService.js';
import { v4 as uuidv4 } from 'uuid';

export const processPayment = async (req, res) => {
  try {
    const { merchantId, cardType ,cardNumber, expiryDate, cvv, amount } = req.body;

    // Validate merchant
    const merchant = await Merchant.findOne({ where: { merchantId } });
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant not found' });
    }

    // Validate card with the bank API
    const cardValidation = await paymentProcessor.validateCard({ cardType, cardNumber, expiryDate, cvv });
    console.log(cardValidation);
    if (!cardValidation.success) {
      return res.status(400).json({ success: false, message: 'Card validation failed', details: cardValidation.message });
    }
    // Ensure merchant has enough funds (if needed in business logic)
    if (parseFloat(merchant.balance) < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance in merchant account' });
    }

    // Process payment logic (deduct funds, etc.)
    const newPayment = await Payment.create({
      merchantId,
      cardNumber,
      amount,
      status: 'COMPLETED',
    });

    // Update bank account for merchant after successful transaction
    const updateAccount = await paymentProcessor.updateBankAccount({
      amount,
      cardType,
      cardNumber,
      cvv
    });

    if (!updateAccount.success) {
      return res.status(500).json({ success: false, message: 'Failed to update bank account', details: updateAccount.message });
    }

    // Update merchant balance
    merchant.balance = parseFloat(merchant.balance) - amount;
    await merchant.save();

    res.status(201).json({ success: true, message: 'Payment processed successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
