import { Response } from "express";
import { RequestType } from "../types";
import User from "../models/User";
import Friend from "../models/Friend";

const include = [
  {
    model: User,
    as: "sender",
  },
  {
    model: User,
    as: "receiver",
  },
];

export const create = async (req: RequestType, res: Response) => {
  const { senderId, receiverId } = req.body;
  // Validate request
  if (!senderId || !receiverId) {
    return res.status(400).json({
      msg: "No details provided",
    });
  }
  try {
    const friend = await Friend.create({
      senderId,
      receiverId,
    });
    if (friend) {
      return res.status(200).json({ friend });
    } else {
      return res.status(500).json({ msg: "Error creating friend" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error creating friend",
    });
  }
};

export const update = async (req: RequestType, res: Response) => {
  const { senderId, receiverId, status } = req.body;
  // Validate request
  if (!senderId || !receiverId || !status) {
    return res.status(400).json({
      msg: "No details provided",
    });
  }
  try {
    const friend = await Friend.update(
      { status },
      {
        where: { senderId, receiverId },
      }
    );
    if (friend) {
      return res.status(200).json({ friend });
    } else {
      return res.status(500).json({ msg: "Error updating friend" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error updating friend",
    });
  }
};

export const findAll = async (_req: RequestType, res: Response) => {
  try {
    const friends = await Friend.findAll({
      include,
    });
    return res.status(200).json({ friends });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const usersFriends = async (req: RequestType, res: Response) => {
  const { id: senderId, status } = req.query;
  if (!senderId)
    return res.status(400).json({ msg: "Bad Request: User id not provided" });
  try {
    const friends = await Friend.findAll({
      where: {
        senderId,
        status: status ? status : "friend",
      },
      include: [
        {
          model: User,
          as: "receiver",
          attributes: { exclude: ["password"] },
        },
        // {
        //   model: User,
        //   as: "sender",
        // },
      ],
    });
    return res.status(200).json({ friends });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const findOne = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  console.log("THIS IS QUERY", req.query);
  if (!id)
    return res.status(400).json({ msg: "Bad Request: friend id not provided" });
  try {
    const friend = await Friend.findByPk(Number(id), {
      include,
    });
    if (!friend) return res.status(404).json({ msg: "friend not found" });
    return res.status(200).json({ friend });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
