import { GetStaticPropsContext } from 'next';

import { useCallback } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Profile from '@molecules/Profile';
import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';
import NotFound from '@templates/NotFound';
import { getProductDetail, useProdutDetail } from 'api/product';
import SellerComment from 'components/Product/molecules/SellerComment';
import ProductBasic from 'components/Product/organisms/ProductBasic';
import ProductFooter from 'components/Product/organisms/ProductFooter';
import ProductNotice from 'components/Product/organisms/ProductNotice';
import ProductSize from 'components/Product/organisms/ProductSize';
import { useSearchStore } from 'store/useSearchStore';

import $ from './style.module.scss';

export async function getServerSideProps({ params }: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const id = params?.id;
  const paramId = (typeof id !== 'object' && id) || '0';

  await queryClient.prefetchQuery('styles', () => getProductDetail(paramId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: paramId,
    },
  };
}

function ShopDetail({ id }: { id: string }) {
  const { data } = useProdutDetail(id);
  const addProduct = useSearchStore(
    useCallback((state) => state.addProduct, []),
  );
  const detailData = data?.data;

  if (detailData) {
    const { isMe, sellerInfo, basic, sellerNotice, measure } = detailData;
    const { opinion, price, isIncludeDelivery, updatedAt, like, views } =
      detailData;
    addProduct({ id: +id, img: sellerInfo.image[0] }); // TODO: 실험해볼 것
    return (
      <>
        <HeadMeta
          title="re:Fashion | 상품 상세보기"
          url={`${seoData.url}/shop/${id}`}
        />

        <Layout noPadding decreaseHeight={100}>
          <ImgSlide imgList={sellerInfo.image} />
          <Profile profile={sellerInfo} />
          <section className={$['shop-detail-info']}>
            <ProductBasic basic={basic} />
            <ProductNotice sellerNotice={sellerNotice} />
            {measure.length && (
              <ProductSize size={measure} kind={basic.classification} />
            )}
            {opinion && (
              <SellerComment opinion={opinion} src={sellerInfo.profileImg} />
            )}
            <ProductFooter
              footer={{
                ...{ price, isIncludeDelivery, updatedAt, like, views },
              }}
            >
              연락하기
            </ProductFooter>
          </section>
        </Layout>
      </>
    );
  }
  return <NotFound />; // TODO: 데이터 fetching 실패했을 때, 로딩, 에러
}

export default ShopDetail;
