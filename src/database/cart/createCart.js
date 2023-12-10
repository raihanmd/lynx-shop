import { con } from "@/connection/db";

export async function createCart({ idCart, idUser, idProduct, quantityProduct }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        const [detailProduct = rows] = await connection.query(
          `SELECT p.price, 
                  p.quantity 
            FROM products AS p
              WHERE p.id = '${idProduct}'`
        );
        if (detailProduct.length <= 0) {
          const err = new Error(`Forbidden.`);
          err.statusCode = 403;
          err.payload = "Invalid action.";
          throw err;
        }

        if (detailProduct[0].quantity < quantityProduct) {
          const err = new Error(`Bad request.`);
          err.statusCode = 400;
          err.payload = "Quantity of product is lesser than you try to order.";
          throw err;
        }

        await connection
          .query(
            `INSERT INTO cart
                (id, id_user, id_products, quantity)
                  VALUES ('${idCart}', '${idUser}', '${idProduct}', ${quantityProduct})`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
              throw err;
            }
          });

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
