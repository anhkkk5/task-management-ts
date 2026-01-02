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

//[post /api/v1/users/login]
export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }
  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu !",
    });
  } else {
    const token = user.token;

    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      token: token,
    });
  }
};
