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
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  Toast,
  Frame,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [infoMessage, setMessage] = useState(null);
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
      .then((response) => {
        if (response.status === 409) {
          setMessage("Il n'y a pas de nouveaux achats.");
          return [];
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.length) {
          setOrders([...data, ...orders]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  if (isLoading) {
    return (
      <SkeletonPage title="En téléchargeant..." primaryAction>
        <Layout>
          <Layout.Section>
            <Card>
              <Layout.Section>
                <SkeletonDisplayText maxWidth="60%" />
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <BlockStack>
                  <SkeletonBodyText lines={5} />
                </BlockStack>
              </Layout.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

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
    )
  );

  return (
    <Frame>
      <Page
        title="Les ordres"
        subtitle="Montrer les ordres d'achats dans notre base de données"
        backAction={{ onAction: () => router.push("/") }}
        primaryAction={{
          content: "Import",
          onAction: updateOrders,
        }}
      >
        <Layout>
          {infoMessage && (
            <Toast content={infoMessage} onDismiss={() => setMessage(null)} />
          )}
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="p" variant="p">
                  The following orders has been imported from Shopify using
                  webhooks or updated manually.
                </Text>
                <BlockStack gap="200">
                  {orders.length > 0 ? (
                    <IndexTable
                      itemCount={orders.length}
                      headings={[
                        { title: "Order Number" },
                        { title: "Customer" },
                        { title: "Total Price", alignment: "end" },
                      ]}
                    >
                      {rowMarkup}
                    </IndexTable>
                  ) : (
                    <Text as="p">Il n'y a pas d'achats</Text>
                  )}
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default OrdersPage;
