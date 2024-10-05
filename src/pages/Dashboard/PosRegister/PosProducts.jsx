import { Badge, Card, Divider, Form, Skeleton, Spin, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { productImage } from '../../../assets/data/productImage';
import { GlobalUtilityStyle } from '../../../container/Styled';
import { useCurrentUser } from '../../../redux/services/auth/authSlice';
import { useGetAllProductVariantsQuery } from '../../../redux/services/product/productApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import { openNotification } from '../../../utilities/lib/openToaster';

const { Meta } = Card;

const PosProducts = ({ form, setProducts, searchParams }) => {
  const warehouseId = Form.useWatch('warehouse_id', form);
  const warehouseDefault = useSelector(useCurrentUser).warehouse_id;

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 25,
    allData: 1,
  });

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: {
      ...pagination,
      attachmentable: 1,
      // warehouse_id: warehouseId,
      ...searchParams,
    },
    selectValue: [
      ...DEFAULT_SELECT_VALUES,
      'sku',
      'buying_price',
      'tax_id',
      'sale_unit_id',
      'purchase_unit_id',
    ],
  });

  const { data, isLoading } = useGetAllProductVariantsQuery({
    params,
  });

  const [newData, setNewData] = useState([]);

  const products = data?.results?.productvariant;
  const total = data?.meta?.total || 0;

  const loadMoreData = useCallback(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  }, []);

  useEffect(() => {
    if (products?.length > 0 && pagination.page > 1) {
      setNewData((prevData) => [...prevData, ...products]);
    } else if (products?.length > 0) {
      setNewData(products);
    } else {
      setNewData([]);
    }
  }, [pagination.page, products]);

  const onSelect = (selectedProduct) => {
    const stock = getWarehouseQuantity(
      selectedProduct?.product?.product_qties,
      warehouseId
    );

    if (!stock) {
      // message.error("Product is out of stock");
      openNotification('info', 'Product is out of stock');
      return;
    }

    setProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => {
        return (
          product?.id.toString() === selectedProduct?.product?.id.toString()
        );
      });

      if (!productExists) {
        return [...prevProducts, selectedProduct.product];
      }

      // message.warning("Product already exists in the list");
      openNotification('info', 'Product already exists in the list');
      return prevProducts;
    });
    // setValue(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="mt-4 text-center text-lg">
          <Spin />
        </div>
      </div>
    );
  }

  return (
    <GlobalUtilityStyle className="flex h-full flex-col overflow-auto  pb-0">
      <div className="grow">
        <div className="overflow-auto" id="scrollable">
          <InfiniteScroll
            dataLength={newData?.length}
            next={loadMoreData}
            hasMore={newData?.length < total}
            loader={
              <Skeleton
                className="my-4"
                paragraph={{
                  rows: 3,
                }}
                active
              />
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollable"
          >
            <div className="grid grid-cols-2 overflow-hidden p-1 xl:grid-cols-3">
              {products &&
                newData.map((product) => {
                  const warehouse = warehouseId ?? warehouseDefault;

                  const stock = getWarehouseQuantity(
                    product?.product_qties,
                    warehouse
                  );

                  console.log(product, stock);

                  if (stock > 0)
                    return (
                      <div key={product.id} className="w-full p-1">
                        <Badge
                          count={stock}
                          overflowCount={99}
                          className="w-full"
                          offset={[-13, 7]}
                        >
                          <Card
                            bordered
                            hoverable
                            className="border-secondary-hover"
                            style={{
                              backgroundColor: 'white',
                            }}
                            styles={{
                              body: {
                                padding: '8px 8px',
                              },
                            }}
                            key={product.id}
                            cover={
                              <div className="w-full">
                                <img
                                  alt="example"
                                  className="mx-auto size-20 object-cover"
                                  src={
                                    // images?.attach_file?.[0]?.url ??
                                    // images?.attachments?.[0]?.url ??
                                    productImage
                                  }
                                />
                              </div>
                            }
                            onClick={() => onSelect({ product })}
                          >
                            <Meta
                              className="text-center"
                              style={{
                                fontSize: '12px',
                              }}
                              title={
                                <Tooltip
                                  title={product.name}
                                  showArrow={false}
                                  placement="top"
                                >
                                  <span className="text-sm">
                                    {product.name}
                                  </span>
                                </Tooltip>
                              }
                              description={product.sku}
                            />
                          </Card>
                        </Badge>
                      </div>
                    );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div></div>
    </GlobalUtilityStyle>
  );
};

export default PosProducts;
