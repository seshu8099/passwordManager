import bcryptjs from "bcryptjs";
import userModal from "../Modals/userModal.js"; // Corrected: Removed duplicate import
import jwt from "jsonwebtoken";

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the field" });
    }

    //   check user exist or not
    const existuser = await userModal.findOne({ email });

    if (!existuser) {
      return res.status(404).json({ success: false, message: "user  does not exist  " });
    }

    //  campare pasword
    const comparepassword = await bcryptjs.compare(
      password,
      existuser.password
    );

    console.log(comparepassword);
    if (!comparepassword) {
      return res.status(400).json({ success: false, message: "password is incorrect " });
    }
    //generating web token every time when we try to log in
    const token = jwt.sign({ _id: existuser?._id }, process.env.JWT_SECRET);
    if (!token) {
      return res.status(500).json({ success: false, message: "invalid token " });
    }

    existuser.refreshtoken = token;
    await existuser.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "login successfully",
      token: token
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

// sigup user
export const SignupUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the field" });
    }

    // check exitance  of user

    const existuser = await userModal.findOne({ email });
    if (existuser) {
      return res.status(409).json({ success: false, message: "user already exist " });
    }

    // hasing password
    const hashpassowrd = await bcryptjs.hash(password, 10);

    // save user

    const newuser = new userModal({
      name,
      password: hashpassowrd,
      email,
    });

    await newuser.save();

    // generate token
    const token = jwt.sign({ _id: newuser?._id }, process.env.JWT_SECRET);
    if (!token) {
      return res.status(500).json({ success: false, message: "invalid token " });
    }
    newuser.refreshtoken = token;
    await newuser.save({ validateBeforeSave: false });

    return res.status(201).json({
      success: true,
      message: "user registered successfully ",
      token: token
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export const Logout = async (req, res) => {
  const userid = req.user?._id;
  console.log(userid)
  try {
    await userModal.findByIdAndUpdate(
      userid,
      {
        $set: {
          refreshtoken: null,
        },
      }
    );

    return res.status(200).json({
      success: true,

      message: "user Logout successfully ",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};
