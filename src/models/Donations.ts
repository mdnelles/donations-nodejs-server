import Sequelize from "sequelize";
import { db } from "../../database/db";

export const Donations = db.sequelize.define(
   "donation",
   {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      amount: {
         type: Sequelize.FLOAT,
      },
      nickname: {
         type: Sequelize.STRING,
      },
      state: {
         type: Sequelize.STRING,
      },
      cid: {
         type: Sequelize.INTEGER,
      },
   },
   {
      timestamps: false,
   }
);
