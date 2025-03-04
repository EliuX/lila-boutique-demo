import { convertShopifyOrder, createOrder } from "@/utils/ordersHandler";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    console.log("Serve this only if the request method is POST");
    return res.status(405).send({ error: true });
  }

  try {
    const data = convertShopifyOrder(req.body);
    const createdOrder = await createOrder(data);

    return res.status(200).send({
      message: "Order created",
      data: JSON.stringify(createdOrder),
    });
  } catch (e) {
    console.error(e);
    return res.status(403).send({
      message: e.message,
      error: true,
    });
  }
};

export default handler;
