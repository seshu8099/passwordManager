import passwordModel from "../Modals/passModal.js";
import { encryptPassword, decryptPassword } from "../Utils/crypto.js";

export const Getpassword = async (req, res) => {
  const userid = req.user?._id;
  try {
    const allpassword = await passwordModel.find({ Author: userid });

    // Decrypt passwords before sending to the frontend
    const decryptedPasswords = allpassword.map((p) => {
      return {
        ...p.toObject(),
        password: decryptPassword(p.password),
      };
    });

    return res.status(200).json({
      success: true,
      data: decryptedPasswords,
      message: "get all password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export const PostPassword = async (req, res) => {
  const userid = req.user?._id;
  const { title, username, password } = req.body;
  try {
    if (!title || !username || !password) {
      return res.status(400).json({ success: false, message: "please fill all field" });
    }

    const newpassword = new passwordModel({
      title,
      username,
      password: encryptPassword(password), // Encrypt the password here
      Author: userid,
    });

    await newpassword.save();

    // Decrypt the password for a consistent response
    const decryptedResponse = {
      ...newpassword.toObject(),
      password: decryptPassword(newpassword.password),
    };

    return res.status(201).json({
      success: true,
      data: decryptedResponse,
      message: "password save successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export const DeletePassword = async (req, res) => {
  const userid = req.user?._id;
  const pwid = req.params.id;
  try {
    const deletedPassword = await passwordModel.findOneAndDelete({ _id:pwid, Author: userid });
    if (!deletedPassword) {
      return res.status(404).json({ success: false, message: "Password not found or user not authorized" });
    }
    return res.status(200).json({
      success: true,
   
      message: "password delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export const UpdatePassword = async (req, res) => {
  const userid = req.user?._id;
  const pwid = req.params.id;
  const { title, username, password } = req.body;
  console.log(req.body)

  try {
    if (!title || !username || !password) {
      return res.status(400).json({ success: false, message: "please fill all field" });
    }

    const updatedPassword = await passwordModel.findOneAndUpdate(
      { _id: pwid, Author: userid }, // Filter to find the document
      {
        // The update to apply
        title,
        username,
        password: encryptPassword(password), // Encrypt the new password
      },
      { new: true } // Option to return the document *after* the update
    );

    if (!updatedPassword) {
      return res.status(404).json({ success: false, message: "Password not found or you are not authorized to update it" });
    }

    const decryptedResponse = {
      ...updatedPassword.toObject(),
      password: decryptPassword(updatedPassword.password),
    };

    return res.status(200).json({
      success: true,
      data: decryptedResponse,
      message: "password update successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};
