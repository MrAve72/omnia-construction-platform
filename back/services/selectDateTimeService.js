import { ApiError } from "../error/ApiError.js";
import { SelectDateTime, Consultation } from "../models/models.js";
import { Op } from "sequelize";

class SelectDateTimeService {
  async add(date, time, limits, period) {
    if (!date || !time || !limits) {
      throw ApiError.badRequest("Please fill in all fields!");
    }

    const find = await SelectDateTime.findOne({
      where: { date, time },
    });

    if (find) {
      throw ApiError.badRequest("SelectDateTime already exists!");
    }

    await SelectDateTime.create({ date, time, limits, period });
    return { message: "Create successfully!" };
  }

  async addBulk(dates, times, limits) {
    if (!dates || !times || !limits || dates.length === 0 || times.length === 0) {
      throw ApiError.badRequest("Please provide dates, times and limits!");
    }

    let createdCount = 0;
    let skippedCount = 0;
    const errors = [];

    // Создаем все комбинации дата + время
    for (const date of dates) {
      for (const timeData of times) {
        try {
          // Проверяем, существует ли уже такой слот
          const existingSlot = await SelectDateTime.findOne({
            where: { date, time: timeData.time }
          });

          if (existingSlot) {
            skippedCount++;
            continue; // Пропускаем существующие слоты
          }

          // Создаем новый слот
          await SelectDateTime.create({
            date,
            time: timeData.time,
            period: timeData.period,
            limits,
            booked: 0
          });

          createdCount++;
        } catch (error) {
          errors.push(`Error creating slot ${date} ${timeData.time}: ${error.message}`);
        }
      }
    }

    return {
      message: `Bulk operation completed: ${createdCount} slots created, ${skippedCount} skipped${errors.length > 0 ? `, with ${errors.length} errors` : ''}`,
      details: {
        createdCount,
        skippedCount,
        errors: errors.length > 0 ? errors : undefined
      }
    };
  }

  async update(id, date, time, limits, period) {
    const find = await SelectDateTime.findOne({ where: { id } });

    if (!find) {
      throw ApiError.badRequest("SelectDateTime not found!");
    }

    if (date && time) {
      const duplicate = await SelectDateTime.findOne({
        where: {
          date,
          time,
          id: { [Op.ne]: id },
        },
      });

      if (duplicate) {
        throw ApiError.badRequest(
          "Another SelectDateTime with same date/time exists!"
        );
      }
    }

    await SelectDateTime.update(
      {
        date: date ?? find.date,
        time: time ?? find.time,
        limits: limits ?? find.limits,
        period: period ?? find.period,
      },
      { where: { id } }
    );

    return { message: "SelectDateTime updated successfully!" };
  }

  async getAll() {
    const data = await SelectDateTime.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
    return data;
  }

  async getById(id) {
    const result = await SelectDateTime.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("SelectDateTime not found!");
    }

    return result;
  }

  async getByDate(date) {
    const data = await SelectDateTime.findAll({ where: { date } });

    if (!data) {
      throw ApiError.notFound("SelectDateTime not found!");
    }

    return data;
  }

  async delete(id) {
    const findSelectDateTime = await SelectDateTime.findOne({ where: { id } });

    if (!findSelectDateTime) {
      throw ApiError.notFound("findSelectDateTime not found!");
    }

    const checkConsultation = await Consultation.findOne({
      where: { slect_date_time_id: id },
    });

    if (checkConsultation) {
      throw ApiError.notFound(
        "Deletion is not possible, there is a сonsultation for this date!"
      );
    }

    await SelectDateTime.destroy({ where: { id } });
    return { message: "SelectDateTime deleted successfully!" };
  }
}

export const selectDateTimeService = new SelectDateTimeService();
