import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Formato de imagen no válido. Solo se permite .jpeg o .png")
      );
    }
  },
};

const upload = multer(configMulter).single("imagen");

const uploadFile = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }
    return next();
  });
};
export default uploadFile;
