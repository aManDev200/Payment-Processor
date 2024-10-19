import { DataTypes } from 'sequelize';

import config from '../config.js'
const {sequelize} = config;

const Card = sequelize.define('Card', {
  cardNumber: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedAccountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedAccountId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creditLimit: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  creditUsed: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
});

export default Card;
