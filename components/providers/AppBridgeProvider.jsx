const AppBridgeProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const shop = window?.shopify?.config?.shop;

    if (!shop) {
      return <p>Cette boutique est juste disponible dans Shopify</p>;
    }
  }

  return <>{children}</>;
};

export default AppBridgeProvider;
