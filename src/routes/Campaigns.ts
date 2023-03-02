//import Sequelize from "sequelize";
import { Donations } from "../models/Donation";
import { Campaigns } from "../models/Campaign";
export const api = async (req: any, res: any): Promise<any> => {
   res.json({ status: 201, err: false, msg: "basic api" });
   console.log(" >>>> basic");
};

export const view = async (req: any, res: any): Promise<any> => {
   try {
      const data = await Campaigns.findAll({ where: { status: "active" } });
      res.json({ status: 200, err: false, msg: "ok", data });
   } catch (error) {
      console.log(error);
      res.json({ status: 201, err: true, msg: "list failed", error });
   }
};

export const fraud = async (req: any, res: any): Promise<any> => {
   const { cname } = req.params;
   try {
      const campaign = await Campaigns.update(
         { status: "fraud" },
         { where: { name: cname } },
         { limit: 1 }
      );
      const msg = `Campaign ${cname} marked as fraud`;

      // now remove the donations
      try {
         const data = await Campaigns.findAll({ where: { name: cname } });
         const donations = await Donations.update(
            { state: "fraud" },
            { where: { cid: data[0].id } },
            { limit: 5000 }
         );

         res.json({ status: 200, err: false, msg, campaign, donations });
      } catch (error) {
         console.log(error);
         res.json({ status: 201, err: true, msg: "update failed", error });
      }
   } catch (error) {
      console.log(error);
      res.json({ status: 201, err: true, msg: "", error });
   }
};

// for init purposes only
export const add = async (req: any, res: any): Promise<any> => {
   const { name, goal = 500, status = "active" } = req.body;
   try {
      const campaignData = {
         name,
         description: `${name} lorem ipsum dolor sit amet, consectetur adipiscing elit.}`,
         goal,
         status,
      };
      const campaign = await Campaigns.create(campaignData);
      const msg = `Campaign added successfully`;
      res.json({ status: 200, err: false, msg, campaign });
   } catch (error) {
      console.log(error);
      res.json({ status: 201, err: true, msg: "", error });
   }
};
