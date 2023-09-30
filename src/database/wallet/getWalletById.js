import { con } from "@/connection/db";

export async function getWalletById(userId) {
  return await con
    .query(`SELECT balance FROM wallet WHERE id_user = '${userId}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
