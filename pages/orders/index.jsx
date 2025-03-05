"use client";

import {
  Page,
  Card,
  BlockStack,
  Text,
  Layout,
  IndexTable,
  InlineStack,
  Button,
  Spinner,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const updateOrders = async () => {
    setLoading(true);
    const [{ createdAt }] = orders;

    return fetch(`/api/orders/update?afterDate=${createdAt}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setOrders([...data, ...orders]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const rowMarkup = orders.map(
    ({ id, orderNumber, customer, totalPrice }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {orderNumber}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{customer || "?"}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {totalPrice}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <>
      <Page
        title="Les ordres"
        subtitle="Montrer les ordres d'achats dans notre base de données"
        backAction={{ onAction: () => router.push("/orders") }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="headingMd">
                  The following orders has been imported from Shopify using
                  webhooks or updated manually.
                </Text>
                <InlineStack wrap={false} align="end">
                  {isLoading ? (
                    <Spinner accessibilityLabel="Loading" size="small" />
                  ) : (
                    <Button variant="primary" onClick={updateOrders}>
                      Update
                    </Button>
                  )}
                </InlineStack>
                {orders.length > 0 ? (
                  <IndexTable
                    itemCount={orders.length}
                    headings={[
                      { title: "Order Number" },
                      { title: "Customer" },
                      { title: "Total Price" },
                    ]}
                  >
                    {rowMarkup}
                  </IndexTable>
                ) : (
                  <Text as="p">There are no orders.</Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default OrdersPage;
