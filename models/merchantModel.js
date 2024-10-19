import { DataTypes } from 'sequelize';
import config from '../config.js'
const {sequelize} = config;

const Merchant = sequelize.define('Merchant', {
  merchantId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Merchant;
