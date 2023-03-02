import Sequelize from "sequelize";
import { db } from "../../database/db";

export const Campaigns = db.sequelize.define(
   "campaigns",
   {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true,
      },
      name: {
         type: Sequelize.STRING,
      },
      description: {
         type: Sequelize.STRING,
      },
      goal: {
         type: Sequelize.FLOAT,
      },
      status: {
         type: Sequelize.STRING,
      },
   },
   {
      timestamps: false,
   }
);
