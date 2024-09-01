import { Badge, Card, Divider, Form, Skeleton, Spin, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { productImage } from '../../../assets/data/productImage';
import { GlobalUtilityStyle } from '../../../container/Styled';
import { useGetAllProductsQuery } from '../../../redux/services/product/productApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import { openNotification } from '../../../utilities/lib/openToaster';

const { Meta } = Card;

const PosProducts = ({
  form,
  setProducts,
  searchParams,
  // setFormValues,
  // setProductUnits,
}) => {
  const warehouseId = Form.useWatch('warehouse_id', form);

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
      warehouse_id: warehouseId,
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

  const { data, isLoading } = useGetAllProductsQuery({
    params,
  });

  const [newData, setNewData] = useState([]);

  const products = data?.results?.product;
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

  // useEffect(() => {
  //   if (warehouseId) {
  //     setFormValues({
  //       product_list: {
  //         product_id: {},
  //         qty: {},
  //         sale_unit_id: {},
  //         net_unit_price: {},
  //         discount: {},
  //         tax_rate: {},
  //         tax: {},
  //         total: {},

  //         tax_id: {},
  //       },
  //     });

  //     setProducts([]);

  //     setProductUnits({
  //       sale_units: {},
  //       tax_rate: {},
  //     });
  //   }
  // }, [setFormValues, setProductUnits, setProducts, warehouseId]);

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
        return product?.id === selectedProduct?.product?.id;
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
    <GlobalUtilityStyle className="flex h-full flex-col overflow-auto p-3 pb-0">
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
            <div className="grid grid-cols-2 overflow-hidden p-1 xl:grid-cols-4">
              {products &&
                newData.map((product) => {
                  const stock = getWarehouseQuantity(
                    product?.product_qties,
                    warehouseId
                  );

                  if (stock > 1)
                    return (
                      <div key={product.id} className="w-full p-2">
                        <Badge
                          count={stock}
                          overflowCount={99}
                          className="w-full"
                          offset={[-15, 0]}
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
                                padding: '12px 8px',
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
