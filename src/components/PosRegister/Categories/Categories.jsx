import { useGetAllCategoryQuery } from "../../../redux/services/category/categoryApi";

export const Categories = () => {
  const { data, isLoading } = useGetAllCategoryQuery({});

  const options = data?.results?.category?.map((category) => ({
    value: category.id?.toString(),
    label: category.name,
  }));

  console.log(options);

  return <div>Categories</div>;
};
