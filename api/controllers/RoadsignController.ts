import { Response } from "express";
import { RequestType } from "../types";
import Roadsign from "../models/Roadsign";

export const create = async (req: RequestType, res: Response) => {
  const { lat, long } = req.body;
  // Validate request
  if (!lat || !long) {
    return res.status(400).json({
      message: "No details provided",
    });
  }

  try {
    let roadsign = await Roadsign.create(req.body);
    return res.status(200).json({ roadsign });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating roadsign",
    });
  }
};

export const findAll = async (_req: RequestType, res: Response) => {
  try {
    const roadsigns = await Roadsign.findAll();
    return res.status(200).json({ roadsigns });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const findOne = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(400)
      .json({ msg: "Bad Request: Roadsign id not provided" });
  try {
    const roadsign = await Roadsign.findByPk(Number(id));
    if (!roadsign) return res.status(404).json({ msg: "Roadsign not found" });
    return res.status(200).json({ roadsign });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const update = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  try {
    await Roadsign.update(req.body, {
      where: { id },
    });
    return res.status(200).json({
      message: "Roadsign was updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating Roadsign with id=" + id,
      err,
    });
  }
};

export const destroyAll = async (_req: RequestType, res: Response) => {
  try {
    await Roadsign.destroy({
      where: {},
      truncate: false,
    });
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Error deleting", err });
  }
};

export const destroy = async (req: RequestType, res: Response) => {
  const { id } = req.query;
  if (id) {
    try {
      const roadsign = await Roadsign.findByPk(id.toString());
      if (roadsign) {
        await roadsign.destroy();
        return res.status(200).json({ msg: "Successfully deleted" });
      } else {
        return res.status(404).json({ msg: "Roadsign not found" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
  return res.status(400).json({ msg: "Bad Request: Roadsign id not provided" });
};
