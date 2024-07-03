import { useState } from "react";
import DiscountPlanCreate from "../../../components/DiscountPlan/DiscountPlanCreate";
import DiscountPlanTable from "../../../components/DiscountPlan/DiscountPlanTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    // name
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    // products
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    align: "center",
    render: (customer) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customer}
      </span>
    ),
  },
];

const DiscountPlan = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Discount Plans"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      // api={}
    >
      <DiscountPlanCreate />

      <DiscountPlanTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default DiscountPlan;
