import { useState } from "react";
import { GiftCardTypeCreate } from "../../../components/GiftCardType/GiftCardTypeCreate";
import GiftCardTypeTable from "../../../components/GiftCardType/GiftCardTypeTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { GIFT_CARD_TYPE } from "../../../utilities/apiEndpoints/offer.api";

const columns = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
      </span>
    ),
  },
];

const GiftCardType = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Gift Card Type"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={GIFT_CARD_TYPE}
    >
      <GiftCardTypeCreate />

      <GiftCardTypeTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
export default GiftCardType;
