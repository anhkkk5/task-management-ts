//[post /api/v1/users/register]
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../../../helpers/generate";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  req.body.password = md5(req.body.password);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  // console.log(existEmail);
  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
  } else {
    req.body.password = md5(req.body.password);
    req.body.token = generateRandomString(30);
    const user = new User(req.body);

    const data = await user.save();

    const token = data.token;
    res.cookie("token", token);
    res.json({
      code: 200,
      message: "Tạo tài khoản mới thành công",
      token: token,
    });
  }
};
