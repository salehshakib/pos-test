import { Card, Divider, Form, Skeleton, Spin, theme } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productImage } from "../../../assets/data/productImage";
import { useGetAllCategoryQuery } from "../../../redux/services/category/categoryApi";
import { useGlobalParams } from "../../../utilities/hooks/useParams";
import CustomForm from "../../Shared/Form/CustomForm";

const { Meta } = Card;

export const Categories = ({ onClose, setParams }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    allData: 1,
  });

  const [categoriesForm] = Form.useForm();

  const params = useGlobalParams({
    params: pagination,
  });

  const { data, isLoading } = useGetAllCategoryQuery({
    params,
  });

  const [newData, setNewData] = useState([]);

  const categories = data?.results?.category;
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
    if (categories && categories.length) {
      // setNewData((prevData) => [...prevData, ...categories]);
      setNewData((prevData) => {
        const uniqueData = new Set([...prevData, ...categories]);
        return Array.from(uniqueData);
      });
    }
  }, [categories]);

  const [isSelected, setIsSelected] = useState([]);

  const handleCardSelect = (id) => {
    if (isSelected.includes(id)) {
      setIsSelected(isSelected.filter((item) => item !== id));
    } else {
      setIsSelected([...isSelected, id]);
    }
  };

  const handleSubmit = async () => {
    setParams({ category_ids: isSelected });

    // handleCloseDrawer();
  };

  // console.log(isSelected);

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
        scrollableTarget="scrollableDiv"
      >
        <>
          <CustomForm
            form={categoriesForm}
            handleSubmit={handleSubmit}
            onClose={onClose}
          >
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {categories &&
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
                      backgroundColor: isSelected.includes(item.id)
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
                        className=" h-[5rem] lg:h-[6rem] rounded-full object-cover px-4 pt-4"
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
