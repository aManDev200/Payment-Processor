import fetch from 'node-fetch';

// Service to validate the card with the bank
const paymentProcessor = {
  validateCard: async (cardDetails) => {
    try {
      const response = await fetch('http://localhost:3000/api/cards/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cardType : cardDetails.cardType,
            cardNumber : cardDetails.cardNumber,
            expiryDate : cardDetails.expiryDate,
            cvv : cardDetails.cvv
        }),
      });

      const result = await response.json();
      return result; // { success: true/false, message: 'Validation result' }
    } catch (error) {
      return { success: false, message: 'Failed to validate card with bank' };
    }
  },

  updateBankAccount: async (transactionDetails) => {
    try {
      const response = await fetch('http://localhost:3000/api/cards/updateAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount : transactionDetails.amount,
            cardType : transactionDetails.cardType,
            cardNumber : transactionDetails.cardNumber,
            cvv : transactionDetails.cvv
        }),
      });

      const result = await response.json();
      return result; // { success: true/false, message: 'Update result' }
    } catch (error) {
      return { success: false, message: 'Failed to update bank account' };
    }
  },
};

export default paymentProcessor;
