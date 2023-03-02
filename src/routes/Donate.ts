
import { Donations } from "../models/Donation";

export const add = async (req: any, res: any): Promise<any> => {
   const { amount, nickname, state = "valid", cid, cname } = req.body;
   try {
      const donationData = { amount, nickname, state, cid };
      const donation = await Donations.create(donationData);
      const msg = `Donation $${amount} added successfully to campaign ${cname}`;
      res.json({ status: 200, err: false, msg, donation });
   } catch (error) {
      const msg = `Donation $${amount} was not successfully added to campaign ${cname}`;
      console.log(error);
      res.json({ status: 201, err: true, msg, error });
   }
};
