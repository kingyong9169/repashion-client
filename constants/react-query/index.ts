export const queryKey = {
  category: (isExcluded: boolean) => {
    return [isExcluded ? 'excludedCategory' : 'category'];
  },
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['productItemList', { ...requestParams }];
  },
  productDetail: (id: string) => {
    return ['product', id];
  },
  uploadedProduct: (id: string) => {
    return ['uploadedProduct', id];
  },
  searchingItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['searchingProductItemList', { ...requestParams }];
  },
  myInfo: ['myInfo'],
};
