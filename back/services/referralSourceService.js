import { ApiError } from "../error/ApiError.js";
import { ReferralSource, Consultation } from "../models/models.js";

class ReferralSourceService {
  async add(name) {
    if (!name) {
      throw ApiError.badRequest("Name is required!");
    }

    const existingSource = await ReferralSource.findOne({
      where: { name },
    });

    if (existingSource) {
      throw ApiError.badRequest("Referral source with this name already exists!");
    }

    await ReferralSource.create({ name });
    return { message: "Referral source created successfully!" };
  }

  async update(id, name) {
    const findSource = await ReferralSource.findOne({ where: { id } });

    if (!findSource) {
      throw ApiError.badRequest("Referral source not found!");
    }

    if (!name) {
      throw ApiError.badRequest("Name is required!");
    }

    const existingSource = await ReferralSource.findOne({
      where: { name },
    });

    if (existingSource && existingSource.id !== parseInt(id)) {
      throw ApiError.badRequest("Referral source with this name already exists!");
    }

    await ReferralSource.update({ name }, { where: { id } });

    return { message: "Referral source updated successfully!" };
  }

  async getAll() {
    const data = await ReferralSource.findAndCountAll({
      order: [["name", "ASC"]],
    });
    return data;
  }

  async getById(id) {
    const result = await ReferralSource.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Referral source not found!");
    }

    return result;
  }

  async delete(id) {
    const findSource = await ReferralSource.findOne({ where: { id } });

    if (!findSource) {
      throw ApiError.notFound("Referral source not found!");
    }

    const checkConsultation = await Consultation.findOne({
      where: { referral_source_id: id },
    });

    if (checkConsultation) {
      throw ApiError.badRequest(
        "Deletion is not possible, there are consultations using this referral source!"
      );
    }

    await ReferralSource.destroy({ where: { id } });
    return { message: "Referral source deleted successfully!" };
  }
}

export const referralSourceService = new ReferralSourceService(); 