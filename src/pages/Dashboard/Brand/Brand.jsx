import { useState } from "react";
import defaultUser from "../../../assets/data/defaultUserImage";
import BrandCreate from "../../../components/Brand/BrandCreate";
import { BrandTable } from "../../../components/Brand/BrandTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { useExportBrandMutation } from "../../../redux/services/brand/brandApi";

const columns = [
  {
    title: "Img",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-md overflow-hidden mx-auto">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
];

const Brand = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const [exportBrand, { isLoading }] = useExportBrandMutation();

  const handleExport = async (format) => {
    const { data, error } = await exportBrand({
      data: { format },
    });

    console.log(data);
  };

  return (
    <GlobalContainer
      pageTitle="Brand"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      handleExport={handleExport}
    >
      <BrandCreate />

      <BrandTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Brand;
