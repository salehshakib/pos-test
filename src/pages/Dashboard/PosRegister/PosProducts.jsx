import { App, Card, Divider, Skeleton, Spin, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productImage } from "../../../assets/data/productImage";
import { GlobalUtilityStyle } from "../../../container/Styled";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";
const { Meta } = Card;

const PosProducts = ({ setProducts }) => {
  const { message } = App.useApp();

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 13,
    allData: 1,
  });

  const { data, isLoading } = useGetAllProductsQuery({
    params: {
      ...pagination,
      attachmentable: 1,
      selectValue: [
        "id",
        "sku",
        "name",
        "buying_price",
        "tax_id",
        "sale_unit_id",
        "purchase_unit_id",
      ],
      // child: 1,
      parent: 1,
    },
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
      console.log(products);
      setNewData((prevData) => [...prevData, ...products]);
    } else if (products?.length > 0) {
      setNewData(products);
    }
  }, [pagination.page, products]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg mt-4">
          <Spin />
        </div>
      </div>
    );
  }

  const onSelect = (selectedProduct) => {
    setProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => {
        return product?.id === selectedProduct?.product?.id;
      });

      if (!productExists) {
        return [...prevProducts, selectedProduct.product];
      }

      message.warning("Product already exists in the list");
      return prevProducts;
    });
    // setValue(null);
  };

  return (
    <GlobalUtilityStyle className="p-3 pb-0 flex flex-col h-full overflow-auto">
      <div className="grow">
        <div className="overflow-auto " id="scrollable">
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1">
              {products &&
                newData.map((product) => {
                  // const images = organizeAttachments(product?.attachments);

                  return (
                    <Card
                      bordered
                      hoverable
                      className="border-secondary-hover"
                      style={{
                        backgroundColor: "white",
                        // height: "100px",
                      }}
                      key={product.id}
                      cover={
                        <div className="w-full">
                          <img
                            alt="example"
                            className="h-[4rem] mx-auto object-cover "
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
                        title={
                          <Tooltip
                            title={product.name}
                            showArrow={false}
                            placement="top"
                          >
                            {product.name}
                          </Tooltip>
                        }
                        description={product.sku}
                      />
                    </Card>
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div>
        {/* {newData?.length < total && ( */}
        {/* <Divider plain>
          Pull down to load more ....
        </Divider> */}
        {/* )} */}
      </div>
    </GlobalUtilityStyle>
  );
};

export default PosProducts;
