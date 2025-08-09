import { ReferralSource } from "../models/models.js";

const referralSources = [
  { name: "Google" },
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "Friend/Family Referral" },
  { name: "Yelp" },
  { name: "Previous Customer" },
  { name: "Local Advertisement" },
  { name: "Other" }
];

export const seedReferralSources = async () => {
  try {
    // Проверяем, есть ли уже источники в базе данных
    const existingSources = await ReferralSource.findAndCountAll();

    // Если источники уже существуют, не выполняем посев данных
    if (existingSources.count > 0) {
      console.log("Referral sources already exist, skipping seeding.");
      return;
    }

    // Создаем записи для каждого источника
    const createdSources = await Promise.all(
      referralSources.map(source => ReferralSource.create(source))
    );

    console.log(`${createdSources.length} referral sources have been created.`);
  } catch (error) {
    console.error("Error seeding referral sources:", error);
  }
}; 