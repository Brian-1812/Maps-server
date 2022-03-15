import multer from "multer";
import path from "path";
import { RequestType } from "../types";

const imageFilter = (
  _req: RequestType,
  file: any,
  callback: (error: any, acceptFile: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    console.log("Not an image! Errroroororororo here");
    callback("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (_req: RequestType, _file, cb) => {
    cb(null, path.join(__dirname, "../../resources/tmp"));
  },
  filename: (req: RequestType, _file, cb) => {
    const id = req.token?.id;
    cb(null, `address-${id}.png`);
  },
});

const uploadFile = multer({ storage, fileFilter: imageFilter });
export default uploadFile;
