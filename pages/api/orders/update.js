import clientProvider from "@/utils/clientProvider";
import { convertShopifyOrder, createOrder } from "@/utils/ordersHandler";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).send({ text: "Bad request" });
  }

  const afterDate = req.query.afterDate || "";
  const filterCondition = afterDate ? `created_at:>'${afterDate}'` : "";

  try {
    const { client } = await clientProvider.online.graphqlClient({
      req,
      res,
    });

    console.log(
      "Fetching orders from Shopify with filter condition...",
      filterCondition,
    );

    const orders = await client
      .request(
        /* GraphQL */ `query {
        orders (first: 50, query: "${filterCondition}", sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              createdAt
              updatedAt
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                displayName
              }
            }
          }
        }
    }`,
      )
      .then(({ data }) =>
        data.orders.edges?.map((i) => convertShopifyOrder(i.node)),
      );

    if (orders.length > 0) {
      console.log("New orders to be saved locally: ", orders);
      return await Promise.all(orders.map(createOrder))
          .then((orders)=> res.status(200).send(orders))
          .catch(() => { 
            return res.status(409).send({ text: "Elements already imported" });
          });
    }

    return res.status(200).send(orders);
  } catch (e) {
    console.error(`---> Error while updating the orders`, e);
    return res.status(400).send({ text: "Bad request" });
  }
};

export default handler;
