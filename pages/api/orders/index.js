//This is the same as `pages/api/index.js`.

import withMiddleware from "@/utils/middleware/withMiddleware.js";
import { createOrder, getOrders } from "@/utils/ordersHandler";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const orders = await getOrders();

    return res.status(200).send(orders);
  }

  if (req.method === "POST") {
    const createdOrder = await createOrder(req.body);

    return res.status(200).send(createdOrder);
  }

  return res.status(400).send({ text: "Bad request" });
};

export default withMiddleware("verifyRequest")(handler);
