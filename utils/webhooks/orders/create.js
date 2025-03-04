import { convertShopifyOrder, createOrder } from "../../ordersHandler.js";
import prisma from "../../prisma.js";

export default async function handleOrderCreate(
  topic,
  shop,
  rawBody,
  webhookId,
  apiVersion,
) {
  // const orderData = JSON.parse(rawBody);
  try {
    const orderData = convertShopifyOrder(JSON.parse(rawBody));
    console.log(`[Webhook] New order received!`, orderData);

    const createdOrder = await createOrder(orderData);

    console.log("✅ Order saved to DB:", createdOrder.id);

    return createdOrder;
  } catch (e) {
    console.error("❌ Error saving order:", e);
  }
}
