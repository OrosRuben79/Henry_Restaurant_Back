const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const imgUploader = async (req, res) => {
  try {
    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    res.json(secure_url);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const imgDelete = async (req, res) => {
  try {
    const { url } = req.body;

    const nameArr = url.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    const resp = await cloudinary.uploader.destroy(public_id);

    res.json(resp);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  imgUploader,
  imgDelete,
};
