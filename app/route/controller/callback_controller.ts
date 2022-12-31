import express, { Request, Response } from "express";
import ErrorHandler from "../../common/error/error_handler";

const router = express.Router();

router.post("/xendit", async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const status = req.query.status;
    const payload = req.body;

    console.log(status);
    console.log(payload);

    switch (type) {
      case "va":
        //req.query.status value will be 'paid'
        console.log("VA TRIGGERED");
        break;

      case "retail":
        console.log("RETAIL TRIGGERED");
        break;

      case "qr":
        console.log("QR TRIGGERED");
        break;

      case "ewallet":
        //SUCCEDED FAILED
        console.log("EWALLET TRIGGERED");
        break;
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;

//xnd_development_3lLKNoyNUU1kwtWPRua2cUG1jx2pIeA0Eij5JH80aHKN8K5vpHJFzW8Kep
