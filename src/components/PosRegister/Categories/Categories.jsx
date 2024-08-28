import { Card, Divider, Form, Skeleton, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { productImage } from '../../../assets/data/productImage';
import { useGetAllCategoryQuery } from '../../../redux/services/category/categoryApi';
import { useGlobalParams } from '../../../utilities/hooks/useParams';
import CustomForm from '../../Shared/Form/CustomForm';

const { Meta } = Card;

export const Categories = ({
  color,
  isSelected,
  handleCardSelect,
  handleSubmit,
  onClose,
}) => {
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="mt-4 text-center text-lg">
          <Spin />
        </div>
      </div>
    );
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: '90vh',
        overflow: 'auto',
        padding: '0 16px',
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
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
              {categories &&
                newData?.map((item) => (
                  <Card
                    bordered
                    hoverable
                    style={{
                      borderColor: isSelected.includes(item.id) && color,
                    }}
                    key={item.id}
                    className="border shadow-md"
                    onClick={() => handleCardSelect(item.id)}
                    cover={
                      <div className="w-full">
                        <img
                          alt="example"
                          className="mx-auto size-32 overflow-hidden object-cover"
                          src={productImage}
                        />
                      </div>
                    }
                  >
                    <Meta
                      className="text-center"
                      title={<span>{item?.name}</span>}
                      style={{}}
                    />
                  </Card>
                ))}
            </div>
          </CustomForm>
          {newData?.length < total && (
            <div className="my-4 pb-10 text-center">
              Pull down to load more ....
            </div>
          )}
        </>
      </InfiniteScroll>
    </div>
  );
};
