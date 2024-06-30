import { Form } from "antd";
import { useGetAllRolePermissionQuery } from "../../redux/services/rolePermission/rolePermissionApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CustomTable from "../Shared/Table/CustomTable";
import CustomForm from "../Shared/Form/CustomForm";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Module Name",
    dataIndex: "name",
    key: "name",
    align: "left",
    fixed: "left",
    width: 250,
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    //action
    title: "Actions",
    dataIndex: "action",
    key: "action",
    align: "left",
    render: (text, record) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
        {text?.map((action, index) => {
          // const label = action.name
          //   .split(record.name.toLowerCase())[1]
          //   .split(".")[1];

          const label = action?.name?.split(".")[1];

          return (
            <div key={action?.id ?? index}>
              <CustomCheckbox
                name={["permission", record.name, label]}
                label={label}
              />
            </div>
          );
        })}
      </span>
    ),
  },
];

const RolePermission = ({ changePermissionId, open, closeDrawer }) => {
  const [form] = Form.useForm();

  const { data, isFetching } = useGetAllRolePermissionQuery({
    params: {
      role_id: changePermissionId,
    },
  });

  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);

  console.log(form.getFieldValue(["permission", "Accesstoken"]));

  useEffect(() => {
    if (selectedRows.length) {
      selectedRows.map((item) => {
        item?.action?.map((action) => {
          const label = action?.name?.split(".")[1];

          // <div key={action?.id ?? index}>
          //   <CustomCheckbox
          //     name={["permission", item.name, label]}
          //     label={label}
          //   />
          // </div>
          form.setFieldsValue({
            permission: {
              [item.name]: {
                [label]: true,
              },
            },
          });
        });
      });
    } else {
      form.resetFields();
    }
  }, [form, selectedRows]);

  console.log(form.getFieldsValue("permission"));

  const dataSource =
    data?.map((item, index) => {
      const { module, actions } = item ?? {};

      return {
        id: index + 1,
        name: module,
        action: actions,
      };
    }) ?? [];

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data]);

  return (
    <CustomDrawer
      title={"Change Permission"}
      width={1400}
      open={open}
      onClose={closeDrawer}
      isLoading={isFetching}
    >
      <CustomForm form={form}>
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          showPaging={false}
          status={false}
          created_at={false}
          action={false}
          isRowSelection={true}
          setSelectedRows={setSelectedRows}
          tableStyleProps={{
            scroll: {
              y: "73vh",
            },
          }}
        />
      </CustomForm>
    </CustomDrawer>
  );
};

export default RolePermission;
