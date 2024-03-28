import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    // the syntax means all users except loggedUserId one.
    const filteredUsers = await User.find({ _id: { $ne: loggedUserId } });
    res.status(200).json(filteredUsers);
  } catch (error) {}
};
