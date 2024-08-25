import express, { Request, Response } from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebHook", async (req: Request, res: Response) => {
  const paymentOptions = {
    token: req.body.token,
    amount: req.body.amount,
    userId: req.body.user_identifier,
  };

  await db.balance.update({
    where: {
      userId: paymentOptions.userId,
    },
    data: {
      amount: {
        increment: paymentOptions.amount,
      },
    },
  });

  await db.onRampTransaction.update({
    where: {
      token: paymentOptions.token,
    },
    data: {
      status: "Success",
    },
  });
  res.status(200).json({ message: "Payment successful" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
