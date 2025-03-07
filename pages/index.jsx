"use client";

import isInitialLoad from "@/utils/middleware/isInitialLoad";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { ExternalIcon } from "@shopify/polaris-icons";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps(context) {
  //DO NOT REMOVE THIS.
  return await isInitialLoad(context);
}

const HomePage = () => {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      <Page title="Home">
        <Layout>
          <Layout.Section variant="fullWidth">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Les ordres d'achats
                </Text>
                <Text as="p">
                  Montrer les ordres d'achats dans notre base de données
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={async () => {
                      router.push("/orders");
                    }}
                  >
                    Montrer
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          {isDev ? (
            <>
              <Layout.Section variant="oneHalf">
                <Card>
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingMd">
                      Debug Cards
                    </Text>
                    <Text>
                      Explore how the repository handles data fetching from the
                      backend, App Proxy, making GraphQL requests, Billing API
                      and more.
                    </Text>
                    <InlineStack wrap={false} align="end">
                      <Button
                        variant="primary"
                        onClick={() => {
                          router.push("/debug");
                        }}
                      >
                        Debug Cards
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <Card>
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingMd">
                      Enquête d'Exemple
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
                        Execute
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </>
          ) : null}
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  App Bridge CDN
                </Text>
                <Text>AppBridge has moved from an npm package to CDN</Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    external
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://shopify.dev/docs/api/app-bridge-library/reference",
                        "_blank",
                      );
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
                  Repository
                </Text>
                <Text>
                  Found a bug? Open an issue on the repository, or star on
                  GitHub
                </Text>
                <InlineStack wrap={false} align="end" gap="200">
                  <Button
                    external
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://github.com/kinngh/lila-boutique-demo/issues?q=is%3Aissue",
                        "_blank",
                      );
                    }}
                  >
                    Issues
                  </Button>
                  <Button
                    external
                    variant="primary"
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://github.com/kinngh/lila-boutique-demo",
                        "_blank",
                      );
                    }}
                  >
                    Star
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Course
                </Text>
                <Text>
                  [BETA] I'm building course as a live service on How To Build
                  Shopify Apps
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    external
                    variant="primary"
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://kinngh.gumroad.com/l/how-to-make-shopify-apps?utm_source=boilerplate&utm_medium=nextjs",
                        "_blank",
                      );
                    }}
                  >
                    Buy
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf" />
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Course
                </Text>
                <Text>
                  [BETA] I'm building course as a live service on How To Build
                  Shopify Apps
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    external
                    variant="primary"
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://kinngh.gumroad.com/l/how-to-make-shopify-apps?utm_source=boilerplate&utm_medium=nextjs",
                        "_blank",
                      );
                    }}
                  >
                    Buy
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf" />
        </Layout>
      </Page>
    </>
  );
};

export default HomePage;
