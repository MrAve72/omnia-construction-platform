import asyncHandler from "express-async-handler";
import { referralSourceService } from "../services/referralSourceService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class ReferralSourceController {
  add = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const info = await referralSourceService.add(name);
    return res.status(HTTP_STATUSES.CREATED).json(info);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await referralSourceService.update(id, name);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await referralSourceService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await referralSourceService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await referralSourceService.delete(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });
}

export const referralSourceController = new ReferralSourceController(); 