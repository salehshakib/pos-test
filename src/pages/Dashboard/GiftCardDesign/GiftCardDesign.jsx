import { useState } from "react";
import GiftCardDesginTable from "../../../components/GiftCardDesign/GiftCardDesginTable";
import { GiftCardDesignCreate } from "../../../components/GiftCardDesign/GiftCardDesignCreate";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { GIFT_CARD_DESIGN } from "../../../utilities/apiEndpoints/offer.api";

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

const GiftCardDesign = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Gift Card Designs"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={GIFT_CARD_DESIGN}
    >
      <GiftCardDesignCreate />

      <GiftCardDesginTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
export default GiftCardDesign;
