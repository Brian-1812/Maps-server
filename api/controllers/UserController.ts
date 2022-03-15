import { Response } from "express";
import { RequestType } from "../types";
import User from "../models/User";
import authService from "../services/auth.service";

export const register = async (req: RequestType, res: Response) => {
  const { displayname, phoneNumber } = req.body;
  // Validate request
  if (!displayname || !phoneNumber) {
    return res.status(400).json({
      msg: "No details provided",
    });
  }
  try {
    let saved = await User.create(req.body);
    if (saved) {
      let token = authService.issue({
        // id: saved?.id,
        // name: saved?.displayName,
        // phoneNumber: saved?.phoneNumber,
      });
      console.log("THIS IS A TOKEN", token);
      return res.status(200).json({ user: saved, token });
    } else {
      return res.status(500).json({ msg: "Error creating user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error creating user",
    });
  }
};

export const findAll = async (_req: RequestType, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const findContacts = async (req: RequestType, res: Response) => {
  const { contacts } = req.body;
  if (!contacts) return res.status(400).json({ msg: "No contacts provided" });
  try {
    let availableUsers: Array<typeof User> = [];
    let nonUsers: Array<typeof User> = [];
    const users = await User.findAll();
    if (!users?.length)
      return res.status(500).json({ msg: "Internal server error" });
    // for (let i = 0; i < contacts?.length; i++) {
    // const phone = contacts[i];
    // const user = await users.find((user) => user?.phoneNumber === phone);
    // if (user) availableUsers.push(user);
    // else nonUsers.push(phone);
    // }
    return res.status(200).json({ users: availableUsers, nonUsers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const findOne = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  console.log("THIS IS QUERY", req.query);
  if (!id)
    return res.status(400).json({ msg: "Bad Request: User id not provided" });
  try {
    const user = await User.findByPk(Number(id));
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const update = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  try {
    const updateUser = await User.update(req.body, {
      where: { id },
    });
    return res.status(200).json({
      msg: "User was updated successfully.",
      updateUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const destroyAll = async (_req: RequestType, res: Response) => {
  try {
    await User.destroy({
      where: {},
      truncate: false,
    });
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Error deleting" });
  }
};

export const destroy = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  if (id) {
    try {
      const user = await User.findByPk(id.toString());
      if (user) {
        await user.destroy();
        return res.status(200).json({ msg: "Successfully deleted" });
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
  return res.status(400).json({ msg: "Bad Request: User id not provided" });
};
