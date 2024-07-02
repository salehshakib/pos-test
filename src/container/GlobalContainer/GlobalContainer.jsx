// import { PageContainer } from "@ant-design/pro-layout";
// import { Button, Checkbox, Dropdown, Input, Popover, Space } from "antd";
// import { useEffect, useState } from "react";
// import { FaFileImport } from "react-icons/fa";
// import {
//   FaCirclePlus,
//   FaEllipsis,
//   FaEye,
//   FaFileCsv,
//   FaFilePdf,
//   FaPrint,
//   FaTrash,
// } from "react-icons/fa6";
// import { IoSearch } from "react-icons/io5";
// import { TbFilterSearch } from "react-icons/tb";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { useCurrentToken } from "../../redux/services/auth/authSlice";
// import { openCreateDrawer } from "../../redux/services/drawer/drawerSlice";
// import { base_url } from "../../utilities/configs/base_url";
// import { GlobalUtilityStyle } from "../Styled";

// const GlobalContainer = ({
//   pageTitle,
//   columns = [],
//   selectedRows,
//   children,
//   setNewColumns,
//   searchFilterContent,
//   api,
// }) => {
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();
//   const [open, setOpen] = useState(false);
//   const [checkedMenuOpen, setCheckedMenuOpen] = useState(false);
//   const token = useSelector(useCurrentToken);

//   const handleDrawerOpen = () => {
//     dispatch(openCreateDrawer());
//   };

//   const handleMenuClick = (e) => {
//     if (e.key !== "tableColumns") {
//       setCheckedMenuOpen(false);
//     }

//     //console.log(e);
//   };
//   const handleOpenChange = (nextOpen, info) => {
//     if (info.source === "trigger" || nextOpen) {
//       setOpen(nextOpen);
//     }
//   };

//   const handleCheckedOpenChange = (nextOpen, info) => {
//     if (info.source === "trigger" || nextOpen) {
//       setCheckedMenuOpen(nextOpen);
//     }
//   };

//   const defaultCheckedList = columns?.map((item) => item.key);
//   const [checkedList, setCheckedList] = useState(defaultCheckedList);

//   const options = columns.map(({ key, title }) => ({
//     label: title,
//     value: key,
//   }));

//   useEffect(() => {
//     const newColumns = columns?.map((item) => ({
//       ...item,
//       hidden: !checkedList.includes(item.key),
//     }));

//     setNewColumns(newColumns);
//   }, [checkedList, columns, setNewColumns]);

//   const onChange = (list) => {
//     setCheckedList(list);
//   };

//   const handleExport = async (format) => {
//     const fileUrl = new URL(`${base_url}/${api}/export`);
//     const supportedFormats = {
//       xlsx: "xlsx",
//       pdf: "pdf",
//       csv: "csv",
//     };

//     if (!supportedFormats[format]) {
//       console.error("Unsupported file format");
//       return;
//     }

//     fileUrl.searchParams.append("format", format);

//     try {
//       const response = await fetch(fileUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to download file");
//       }

//       await downloadFile(response, supportedFormats[format]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const downloadFile = async (response, extension) => {
//     try {
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");

//       a.href = blobUrl;
//       a.download = `${pageTitle}.${extension}`;
//       document.body.appendChild(a);
//       a.click();

//       window.URL.revokeObjectURL(blobUrl);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error("Error during file download:", error);
//     }
//   };

//   const menu = {
//     onClick: handleMenuClick,
//     className: "-translate-x-[34px] translate-y-1/4",
//     items: [
//       {
//         key: "tableColumns",
//         label: (
//           <Checkbox.Group
//             className="flex flex-col"
//             options={options}
//             value={checkedList}
//             onChange={onChange}
//           />
//         ),
//       },
//     ],
//   };

//   const items = [
//     {
//       key: "view",
//       label: (
//         <Dropdown
//           open={checkedMenuOpen}
//           onOpenChange={handleCheckedOpenChange}
//           key="dropdown"
//           menu={menu}
//           placement="left"
//         >
//           <div>View</div>
//         </Dropdown>
//       ),
//       icon: <FaEye className="text-xl" />,
//     },
//     {
//       label: "Import",
//       key: "import",
//       icon: <FaFileImport className="text-xl" />,
//     },
//     {
//       //pdf
//       label: "PDF",
//       key: "pdf",
//       // onClick: () => handleExport("pdf"),
//       icon: <FaFilePdf className="text-xl" />,
//     },
//     {
//       //excel
//       label: "Excel",
//       key: "excel",
//       onClick: () => handleExport("xlsx"),
//       icon: <FaFileCsv className="text-xl" />,
//     },
//     {
//       //csv
//       label: "CSV",
//       key: "csv",
//       onClick: () => handleExport("csv"),
//       icon: <FaFileCsv className="text-xl" />,
//     },
//     {
//       label: "Print",
//       key: "print",
//       icon: <FaPrint className="text-xl" />,
//     },
//     // {
//     //   label: "Delete",
//     //   key: "delete",
//     //   icon: <FaTrash className="text-xl" />,
//     // },
//   ];

//   const header = {
//     title: <div className="text-2xl lg:text-3xl py-3">{pageTitle}</div>,
//     subTitle: (
//       <>
//         {!["/petty-cash", "/reports"].some((path) =>
//           pathname.includes(path)
//         ) && (
//           <div className="w-full">
//             <Button
//               key={"create"}
//               type="text"
//               icon={<FaCirclePlus size={28} />}
//               style={{
//                 width: "45px",
//                 height: "100%",
//               }}
//               onClick={handleDrawerOpen}
//               className="primary-text flex justify-center items-center"
//             />
//           </div>
//         )}
//       </>
//     ),
//   };

//   return (
//     <GlobalUtilityStyle>
//       <div className="h-full">
//         <PageContainer
//           header={header}
//           extra={[
//             <Space key="search">
//               <Space.Compact>
//                 <Input
//                   type="text"
//                   key="search"
//                   size="large"
//                   className="w-full border rounded-md border-gray-300 focus:outline-none focus:border-primary"
//                   placeholder="Search"
//                   // value={searchUser}
//                   // onChange={handleSearchUser}
//                   prefix={
//                     <IoSearch
//                       style={{
//                         fontSize: "16px",
//                       }}
//                       className="primary-text hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
//                     />
//                   }
//                   allowClear={true}
//                 />
//                 <Popover
//                   content={searchFilterContent}
//                   title={<div className="text-center">Advance Search</div>}
//                   style={
//                     {
//                       // width: "300px"
//                     }
//                   }
//                   trigger="click"
//                   placement="bottomRight"
//                   arrow={false}
//                 >
//                   <Button
//                     key="filter"
//                     size="large"
//                     className="border border-gray-300 "
//                     type="text"
//                   >
//                     <TbFilterSearch
//                       style={{
//                         fontSize: "16px",
//                         // color: "#000",
//                       }}
//                       className="text-xs primary-text lg:text-[16px]"
//                     />
//                   </Button>
//                 </Popover>
//               </Space.Compact>
//             </Space>,

//             <Dropdown
//               key="dropdown"
//               trigger={["click"]}
//               open={open}
//               onOpenChange={handleOpenChange}
//               menu={{
//                 items,
//                 selectable: true,
//                 onSelect: (value) => {
//                   if (value.key !== "view") {
//                     setOpen(false);
//                   }
//                 },
//               }}
//               placement="bottomRight"
//             >
//               <Button style={{ padding: "0 12px" }} size="large">
//                 <FaEllipsis />
//               </Button>
//             </Dropdown>,

//             selectedRows?.length !== 0 && (
//               <div key={"delete"}>
//                 <button className="custom-primary-btn p-2 rounded-xl text-white duration-300 ">
//                   <FaTrash className="text-xl" />
//                 </button>
//               </div>
//             ),
//           ]}
//           content={children}
//         />
//       </div>
//     </GlobalUtilityStyle>
//   );
// };

// export default GlobalContainer;

import { PageContainer } from "@ant-design/pro-layout";
import { Button, Checkbox, Dropdown, Input, Popover, Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaFileCsv, FaFileExcel, FaFilePdf, FaUpload } from "react-icons/fa";
import {
  FaCirclePlus,
  FaEllipsis,
  FaEye,
  FaPrint,
  FaTrash,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCurrentToken } from "../../redux/services/auth/authSlice";
import { openCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { base_url } from "../../utilities/configs/base_url";
import { usePermission } from "../../utilities/lib/getPermission";
import { GlobalUtilityStyle } from "../Styled";

const GlobalContainer = ({
  pageTitle,
  columns = [],
  selectedRows,
  children,
  setNewColumns,
  searchFilterContent,
  api,
  debounce,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [checkedMenuOpen, setCheckedMenuOpen] = useState(false);
  const token = useSelector(useCurrentToken);

  const defaultCheckedList = useMemo(
    () => columns.map((item) => item.key),
    [columns]
  );
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  useEffect(() => {
    const newColumns = columns.map((item) => ({
      ...item,
      hidden: !checkedList.includes(item.key),
    }));
    setNewColumns(newColumns);
  }, [checkedList, columns, setNewColumns]);

  const handleDrawerOpen = () => {
    dispatch(openCreateDrawer());
  };

  const handleMenuClick = (e) => {
    if (e.key !== "tableColumns") {
      setCheckedMenuOpen(false);
    }
  };

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleCheckedOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setCheckedMenuOpen(nextOpen);
    }
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  const handleExport = useCallback(
    async (format) => {
      const fileUrl = new URL(`${base_url}/${api}/export`);
      const supportedFormats = {
        xlsx: "xlsx",
        pdf: "pdf",
        csv: "csv",
      };

      if (!supportedFormats[format]) {
        console.error("Unsupported file format");
        return;
      }

      fileUrl.searchParams.append("format", format);

      try {
        const response = await fetch(fileUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to download file");
        }

        await downloadFile(response, supportedFormats[format]);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, token]
  );

  const downloadFile = async (response, extension) => {
    try {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = blobUrl;
      a.download = `${pageTitle}.${extension}`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  const menu = {
    onClick: handleMenuClick,
    className: "-translate-x-[34px] translate-y-1/4",
    items: [
      {
        key: "tableColumns",
        label: (
          <Checkbox.Group
            className="flex flex-col"
            options={columns.map(({ key, title }) => ({
              label: title,
              value: key,
            }))}
            value={checkedList}
            onChange={onChange}
          />
        ),
      },
    ],
  };

  const items = [
    {
      key: "view",
      label: (
        <Dropdown
          open={checkedMenuOpen}
          onOpenChange={handleCheckedOpenChange}
          key="dropdown"
          menu={menu}
          placement="left"
        >
          <div>View</div>
        </Dropdown>
      ),
      icon: <FaEye size={16} />,
    },
    usePermission(api, "import") && {
      label: "Import",
      key: "import",
      icon: <FaUpload size={16} />,
    },
    usePermission(api, "export") && {
      label: "PDF",
      key: "pdf",
      onClick: () => handleExport("pdf"),
      icon: <FaFilePdf size={16} />,
    },
    usePermission(api, "export") && {
      label: "Excel",
      key: "excel",
      onClick: () => handleExport("xlsx"),
      icon: <FaFileExcel size={16} />,
    },
    usePermission(api, "export") && {
      label: "CSV",
      key: "csv",
      onClick: () => handleExport("csv"),
      icon: <FaFileCsv size={16} />,
    },
    {
      label: "Print",
      key: "print",
      icon: <FaPrint size={16} />,
    },
  ];
  const header = {
    title: <div className="text-2xl lg:text-3xl py-3">{pageTitle}</div>,
    subTitle: usePermission(api, "store") &&
      !["/petty-cash", "/reports"].some((path) => pathname.includes(path)) && (
        <div className="w-full">
          <Button
            key={"create"}
            type="text"
            icon={<FaCirclePlus size={28} />}
            style={{ width: "45px", height: "100%" }}
            onClick={handleDrawerOpen}
            className="primary-text flex justify-center items-center"
          />
        </div>
      ),
  };

  // const [keyword, setKeyword] = useState(null);

  // const debounce = useDebouncedCallback(async (value) => {
  //   if (value.trim() !== "") {
  //     setKeyword(value);
  //   }
  // }, 1000);

  return (
    <GlobalUtilityStyle>
      <div className="h-full">
        <PageContainer
          header={header}
          extra={[
            <Space key="search">
              <Space.Compact>
                <Input
                  type="text"
                  key="search"
                  size="large"
                  className="w-full border rounded-md border-gray-300 focus:outline-none focus:border-primary"
                  placeholder="Search"
                  prefix={
                    <IoSearch
                      style={{ fontSize: "16px" }}
                      className="primary-text hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
                    />
                  }
                  onChange={(e) => debounce(e.target.value)}
                  allowClear={true}
                />
                <Popover
                  content={searchFilterContent}
                  title={<div className="text-center">Advance Search</div>}
                  trigger="click"
                  placement="bottomRight"
                  arrow={false}
                >
                  <Button
                    key="filter"
                    size="large"
                    className="border border-gray-300"
                    type="text"
                  >
                    <TbFilterSearch
                      style={{ fontSize: "16px" }}
                      className="text-xs primary-text lg:text-[16px]"
                    />
                  </Button>
                </Popover>
              </Space.Compact>
            </Space>,
            <Dropdown
              key="dropdown"
              trigger={["click"]}
              open={open}
              onOpenChange={handleOpenChange}
              menu={{
                items,
                selectable: true,
                onSelect: (value) => value.key !== "view" && setOpen(false),
              }}
              placement="bottom"
            >
              <Button style={{ padding: "0 12px" }} size="large">
                <FaEllipsis />
              </Button>
            </Dropdown>,
            selectedRows?.length > 0 && (
              <div key={"delete"}>
                <button className="custom-primary-btn p-2 rounded-xl text-white duration-300">
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ),
          ]}
          content={children}
        />
      </div>
    </GlobalUtilityStyle>
  );
};

export default GlobalContainer;
