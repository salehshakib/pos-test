import { Card, Divider, Skeleton, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { productImage } from "../../../assets/data/productImage";
import { useGetAllCategoryQuery } from "../../../redux/services/category/categoryApi";
import { useGlobalParams } from "../../../utilities/hooks/useParams";

const { Meta } = Card;

export const Categories = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 12,
    allData: 1,
  });

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
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  }, []);

  useEffect(() => {
    if (categories) {
      setNewData((prevData) => [...prevData, ...categories]);
    }
  }, [categories]);

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
          <div className="grid grid-cols-4 gap-4">
            {categories &&
              newData?.map((category) => {
                // const images = organizeAttachments(category?.attachments);
                return (
                  <Card
                    bordered
                    hoverable
                    style={{
                      backgroundColor: "white",
                    }}
                    key={category.id}
                    className="shadow-md"
                    cover={
                      <img
                        alt="example"
                        className="h-[6rem] object-cover px-4 pt-4"
                        src={
                          // images?.attach_file?.[0]?.url ??
                          // images?.attachments?.[0]?.url ??
                          productImage
                        }
                      />
                    }
                  >
                    <Meta className="text-center" title={category.name} />
                  </Card>
                );
              })}
          </div>

          {newData?.length < total && (
            <div className="text-center my-4 pb-40">
              Pull down to load more ....
            </div>
          )}
        </>
      </InfiniteScroll>
    </div>
  );
};
