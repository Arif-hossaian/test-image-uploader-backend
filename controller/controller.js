import StudentModel from '../model/model.js';
import path from 'path';
const fileExtensionNames = ['jpg', 'png'];

export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const students = await StudentModel.create(req.body);
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!student) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json({ data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    const uploadedImage = req.files.upload_image;
    //validation
    const fileSize = uploadedImage.size / 1000;
    const fileExtension = uploadedImage.name.split('.')[1];
    if (fileSize > 500) {
      return res
        .status(400)
        .json({ message: 'file size must be lower than 500' });
    }
    if (!fileExtensionNames.includes(fileExtension)) {
      return res
        .status(400)
        .json({ message: 'file extension must be PNG or JPG' });
    }
    const fileName = `${req.params.id}${path.extname(uploadedImage.name)}`;
    uploadedImage.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      //update student image field
      await StudentModel.findByIdAndUpdate(req.params.id, {
        profile: fileName,
      });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get('host')}/${fileName}`,
        },
      });
    });
    //res.status(200).json({ data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
