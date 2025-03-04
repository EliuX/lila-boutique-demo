import prisma from "./prisma.js";

export function convertShopifyOrder(shopifyOrder) {
  return {
    shopifyId: shopifyOrder.id.toString(),
    orderNumber: shopifyOrder.name || shopifyOrder.order_number?.toString(),
    customer:
      shopifyOrder.customer?.displayName ||
      `${shopifyOrder.customer?.first_name ?? ""} ${shopifyOrder.customer?.last_name ?? ""}`.trim(),
    totalPrice: parseFloat(
      shopifyOrder.total_price || shopifyOrder.totalPriceSet.shopMoney.amount,
    ),
    createdAt: new Date(shopifyOrder.created_at || shopifyOrder.createdAt),
    updatedAt: new Date(shopifyOrder.updatedAt || shopifyOrder.updated_at),
  };
}

export async function createOrder({
  shopifyId,
  orderNumber,
  customer,
  totalPrice,
}) {
  return prisma.orders.create({
    data: {
      shopifyId,
      orderNumber,
      customer,
      totalPrice,
    },
  });
}

export async function getOrders() {
  return prisma.orders.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function saveOrder({
  id,
  shopifyId,
  orderNumber,
  customer,
  totalPrice,
}) {
  await prisma.orders.upsert({
    where: { id },
    update: {
      orderNumber,
      customer,
      totalPrice,
    },
    create: {
      id,
      shopifyId,
      orderNumber,
      customer,
      totalPrice,
    },
  });
}
