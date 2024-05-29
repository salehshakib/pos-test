import { Card, Pagination, Spin } from "antd";
import { productImage } from "../../../assets/data/productImage";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";
import { organizeAttachments } from "../../../utilities/lib/imageFormat";
import { useState } from "react";
const { Meta } = Card;

const PosProducts = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 15,
  });

  const { data, isLoading } = useGetAllProductsQuery({
    params: {
      ...pagination,
      attachmentable: 1,
      allData: 1,
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

  return (
    <div className="m-3 flex flex-col gap-2">
      <div className="h-[42.5rem]">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 ">
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
                      className="h-28 object-cover px-4 pt-4"
                      src={
                        // images?.attach_file?.[0]?.url ??
                        // images?.attachments?.[0]?.url ??
                        productImage
                      }
                    />
                  }
                >
                  <Meta
                    className="text-center"
                    title={product.name}
                    description={product.sku}
                  />
                </Card>
              );
            })}
        </div>
      </div>
      <div className="flex justify-end">
        {products && products.length > 0 && (
          <Pagination
            {...pagination}
            total={data?.meta?.total}
            current={pagination.page}
            onChange={(page) => {
              setPagination({ ...pagination, page });
            }}
            // pageSizeOptions={}
          />
        )}
      </div>
    </div>
  );
};

export default PosProducts;
