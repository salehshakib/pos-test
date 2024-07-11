import { Card, Divider, Form, Skeleton, Spin, theme } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productImage } from "../../../assets/data/productImage";
import { useGetBrandsQuery } from "../../../redux/services/brand/brandApi";
import CustomForm from "../../Shared/Form/CustomForm";

const { Meta } = Card;

export const Brands = ({
  handleSubmit,
  onClose,
  isSelected,
  handleCardSelect,
}) => {
  const [brandForm] = Form.useForm();

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    allData: 1,
  });
  const { data, isLoading } = useGetBrandsQuery({
    params: pagination,
  });

  const [newData, setNewData] = useState([]);

  const brands = data?.results?.brand;
  const total = data?.meta?.total;

  const loadMoreData = useCallback(() => {
    if (newData.length < total) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
    }
  }, [newData.length, total]);

  useEffect(() => {
    if (brands && brands.length) {
      // setNewData((prevData) => [...prevData, ...brands]);
      setNewData((prevData) => {
        const uniqueData = new Set([...prevData, ...brands]);
        return Array.from(uniqueData);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg mt-4">
          <Spin />
        </div>
      </div>
    );
  }

  const { token } = theme.useToken();

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "90vh",
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={newData?.length}
        next={newData?.length < total && loadMoreData}
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
        scrollableTarget="scrollableDiv"
      >
        <>
          <CustomForm
            form={brandForm}
            handleSubmit={handleSubmit}
            onClose={onClose}
          >
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {brands &&
                newData?.map((item) => (
                  // <CustomCheckbox
                  //   name={item.id}
                  //   key={item.id}
                  //   label={
                  //     <Card
                  //       bordered
                  //       hoverable
                  //       style={{
                  //         backgroundColor: "white",
                  //         width: 160,
                  //       }}
                  //       className="shadow-md border "
                  //       cover={
                  //         <img
                  //           alt="example"
                  //           className="h-[6rem] object-cover px-4 pt-4"
                  //           src={productImage}
                  //         />
                  //       }
                  //     >
                  //       <Meta className="text-center" title={item.name} />
                  //     </Card>
                  //   }
                  // />
                  <Card
                    bordered
                    hoverable
                    style={{
                      backgroundColor: isSelected?.includes(item.id)
                        ? token.colorPrimary
                        : "white",

                      // width: 160,
                    }}
                    key={item.id}
                    className="shadow-md border "
                    onClick={() => handleCardSelect(item.id)}
                    cover={
                      <img
                        alt="example"
                        className="h-[6rem] object-cover px-4 pt-4"
                        src={productImage}
                      />
                    }
                  >
                    <Meta
                      className="text-center"
                      title={
                        <span
                          style={{
                            color: isSelected.includes(item.id)
                              ? "white"
                              : "black",
                          }}
                        >
                          {item?.name}
                        </span>
                      }
                      style={{}}
                    />
                  </Card>
                ))}
            </div>
          </CustomForm>
          {newData?.length < total && (
            <div className="text-center my-4 pb-10">
              Pull down to load more ....
            </div>
          )}
        </>
      </InfiniteScroll>
    </div>
  );
};
