import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { useRouter } from "next/router";

const DebugIndex = () => {
  const router = useRouter();

  return (
    <>
      <Page
        title="Les ventes"
        subtitle="Des actions liées aux ventes"
        backAction={{ onAction: () => router.push("/") }}
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Consulter
                </Text>
                <Text>
                  Faire une petite consulte des Produits a l'API de GraphQL
                  (Regardez la console)
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={async () => {
                      const query = `
                                query Products {
                                    products(first: 5) {
                                        edges {
                                            node {
                                                id
                                                title
                                                handle
                                                featuredImage {
                                                    url
                                                }
                                                priceRange {
                                                    minVariantPrice {
                                                        amount
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            `;

                      const response = await fetch("/api/graphql", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ query }),
                      });

                      const data = await response.json();
                      console.log(data);
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Ordres d'achats
                </Text>
                <Text>
                  Faire une petite consulte des Produits a l'API de GraphQL
                  (Regardez la console)
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={async () => {
                      router.push("/orders/list");
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default DebugIndex;
