import express, { Request, Response } from "express";

const app = express();

app.post("/hdfcWebHook", (req: Request, res: Response) => {
  const paymentOptions = {
    token: req.body.token,
    amount: req.body.amount,
    userId: req.body.user_identifier,
  };
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
