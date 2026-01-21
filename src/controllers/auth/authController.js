import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, status: "Active" });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.first_name + " " + user.last_name,
      role: user.role,
    },
  });
};
