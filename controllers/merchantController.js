import Merchant from '../models/merchantModel.js';

// Register or update a merchant
export const registerMerchant = async (req, res) => {
  try {
    const { merchantId, businessName, businessType } = req.body;
    
    // Check if merchant exists
    let merchant = await Merchant.findOne({ where: { merchantId } });

    // If merchant doesn't exist, create a new one
    if (!merchant) {
      merchant = await Merchant.create({
        merchantId,
        businessName,
        businessType,
      });
      return res.status(201).json({ success: true, message: 'Merchant registered successfully', merchant });
    }

    // If merchant exists, update the existing merchant
    merchant.businessName = businessName;
    merchant.businessType = businessType;
    await merchant.save();

    res.status(200).json({ success: true, message: 'Merchant updated successfully', merchant });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

