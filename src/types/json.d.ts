declare module '*.json' {
  const value: any;
  export default value;
}

declare module '/data/products.json' {
  const value: {
    products: any[];
    banners: any[];
    settings: any;
  };
  export default value;
}
