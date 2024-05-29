import { Card, Pagination, Spin } from "antd";
import { productImage } from "../../../assets/data/productImage";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";
import { organizeAttachments } from "../../../utilities/lib/imageFormat";
import { useState } from "react";
const { Meta } = Card;

const PosProducts = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
  });

  const { data, isLoading } = useGetAllProductsQuery({
    params: {
      attachmentable: 1,
    },
  });

  const products = data?.results?.product;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg mt-4">
          <Spin />
        </div>
      </div>
    );
  }

  console.log(pagination);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 m-10">
        {products &&
          products.map((product) => {
            const images = organizeAttachments(product?.attachments);

            return (
              <Card
                bordered
                hoverable
                style={{
                  backgroundColor: "white",
                }}
                key={product.id}
                cover={
                  <img
                    alt="example"
                    className="h-28 object-cover p-4"
                    // className="border border-red-600"
                    src={
                      // images?.attach_file?.[0]?.url ??
                      // images?.attachments?.[0]?.url ??
                      productImage
                    }
                  />
                }
              >
                {/* <p>{product.name}</p> */}
                <Meta
                  className="text-center"
                  title={product.name}
                  description={product.sku}
                />
              </Card>
            );
          })}
      </div>
      {products && products.length > 0 && (
        <Pagination
          {...pagination}
          total={50}
          current={pagination.page}
          onChange={(page) => {
            setPagination({ ...pagination, page });
          }}
          // pageSizeOptions={}
          className=""
        />
      )}
    </>
  );
};

export default PosProducts;
