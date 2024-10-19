import Card from '../models/cardModel.js';

export const registerCard = async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv, linkedAccountType, linkedAccountId, cardType, creditLimit } = req.body;

    // Check if the card already exists
    const existingCard = await Card.findOne({ where: { cardNumber } });
    if (existingCard) {
      return res.status(400).json({ error: 'Card already registered' });
    }

    // Register card in the payment processor
    const newCard = await Card.create({
      cardNumber,
      expiryDate,
      cvv,
      linkedAccountType,
      linkedAccountId,
      cardType,
      creditLimit,
    });

    res.status(201).json({ success: true, message: 'Card registered successfully', newCard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Card validation endpoint for payment authorization
export const validateCard = async (req, res) => {
  try {
    const { cardNumber, cvv, expiryDate } = req.body;

    const card = await Card.findOne({ where: { cardNumber, cvv, expiryDate } });
    if (!card) {
      return res.status(404).json({ success: false, message: 'Invalid card details' });
    }

    res.status(200).json({ success: true, message: 'Card validated successfully', card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
