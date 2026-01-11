import UserModel from "../models/UserModel.js";

export const getUserData = async (req, res) => {
  try {
    //  userAuth middleware se aaya hua user
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
