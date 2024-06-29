import { Form } from "antd";
import { useGetAllRolePermissionQuery } from "../../redux/services/rolePermission/rolePermissionApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CustomTable from "../Shared/Table/CustomTable";
import CustomForm from "../Shared/Form/CustomForm";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "left",
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
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {text?.map((action, index) => {
          const label = action.name
            .split(record.name.toLowerCase())[1]
            .split(".")[1];
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
  const { data, isFetching } = useGetAllRolePermissionQuery({
    params: {
      role_id: changePermissionId,
    },
  });

  const dataSource =
    data?.map((item, index) => {
      const { module, actions } = item ?? {};

      return {
        id: index + 1,
        name: module,
        action: actions,
      };
    }) ?? [];

  const [form] = Form.useForm();

  console.log(Form.useWatch("permission", form));

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
        />
      </CustomForm>
    </CustomDrawer>
  );
};

export default RolePermission;
