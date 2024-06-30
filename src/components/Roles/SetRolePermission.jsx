import { Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useGetAllRolePermissionQuery } from "../../redux/services/rolePermission/rolePermissionApi";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CustomForm from "../Shared/Form/CustomForm";
import CustomTable from "../Shared/Table/CustomTable";

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
        {record.formData &&
          text?.map((action, index) => {
            const label = action?.name?.split(".")[1].toLowerCase();

            const checked =
              record.formData?.[record.name.toLowerCase()]?.[label];

            console.log(record.formData);

            console.log(record.name.toLowerCase(), label);

            return (
              <div key={action?.id ?? index}>
                <CustomCheckbox
                  // name={["permission", record.name.toLowerCase(), label]}
                  label={label}
                  checked={checked}
                  onChange={() =>
                    record.onPermissionChange(record.name.toLowerCase(), label)
                  }
                />
              </div>
            );
          })}
      </span>
    ),
  },
];

function filterMissingObject(oldValue, newValue) {
  const newValueIds = {};
  newValue.forEach((obj) => {
    newValueIds[obj.id] = true;
  });

  const filteredObject = oldValue.find((obj) => !newValueIds[obj.id]);

  return filteredObject;
}

function transformToFormData(data) {
  let formData = {};

  // Iterate over each object in the input data array
  data.forEach((item) => {
    const { module, actions } = item;

    // Extract module name and convert to camelCase
    const moduleName = module.charAt(0).toLowerCase() + module.slice(1);

    // Initialize module in formData if not exists
    if (!formData[moduleName]) {
      formData[moduleName] = {};
    }

    // Iterate over actions array and map action names to false
    actions.forEach((action) => {
      const { id, name } = action;

      // Split action name by '.' and extract the action name
      const actionName = name.split(".")[1];

      // Map actionName to false in the module
      formData[moduleName][actionName] = false;
    });
  });

  return formData;
}

const SetRolePermission = ({ changePermissionId, open, closeDrawer }) => {
  const [form] = Form.useForm();

  const { data, isFetching } = useGetAllRolePermissionQuery({
    params: {
      role_id: changePermissionId,
    },
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(transformToFormData(data));
    }
  }, [data]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (selectedRows.length) {
      selectedRows.map((item) => {
        item?.action?.map((action) => {
          const label = action?.name?.split(".")[1].toLowerCase();

          form.setFieldsValue({
            permission: {
              [item.name.toLowerCase()]: {
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

  const changeSelectedRows = (newSelectedRows) => {
    if (selectedRows?.length > newSelectedRows.length) {
      const deleteRow = filterMissingObject(selectedRows, newSelectedRows);

      deleteRow?.action?.map((action) => {
        const label = action?.name?.split(".")[1].toLowerCase();

        form.setFieldsValue({
          permission: {
            [deleteRow.name.toLowerCase()]: {
              [label]: false,
            },
          },
        });
      });
    }

    setSelectedRows(newSelectedRows);

    if (!newSelectedRows?.length) {
      form.resetFields();
    }
  };

  const onPermissionChange = (name, label) => {
    // const [name, route, label] = id && id.split("_");

    const checked = formData[name][label];

    console.log(formData[name][label]);

    setFormData((prev) => {
      return {
        ...prev,

        [name]: {
          ...prev[name],
          [label]: !checked,
        },
      };
    });
  };

  // const onPermissionChange = (name, label) => {
  //   setFormData((prev) => {

  //     const value = form.getFieldValue(['permission', name, label]);

  //     console.log(value)

  //   });
  // };

  const dataSource =
    data?.map((item) => {
      const { module, actions } = item ?? {};

      return {
        id: module,
        name: module,
        action: actions,
        formData,
        onPermissionChange,
      };
    }) ?? [];

  // const formData = Form.useWatch("permission", form);

  console.log(formData);

  // function transformData(formData) {
  //   let transformedData = [];

  //   for (let key in formData) {
  //     let obj = {
  //       id: key,
  //       name: key,
  //       action: [],
  //     };

  //     let includeObject = false;

  //     if (formData[key]) {
  //       for (let actionKey in formData[key]) {
  //         if (formData[key][actionKey]) {
  //           let actionObj = {
  //             id: Math.floor(Math.random() * 100),
  //             name: `${key}.${actionKey}`,
  //           };
  //           obj.action.push(actionObj);
  //           includeObject = true;
  //         } else {
  //           includeObject = false;
  //           break;
  //         }
  //       }
  //     }

  //     if (includeObject) {
  //       transformedData.push(obj);
  //     }
  //   }

  //   return transformedData;
  // }

  // const result = useMemo(() => transformData(formData), [formData]);

  // useEffect(() => {
  //   if (result.length > 0) {
  //     setSelectedRows(result);
  //   }
  // }, [result]);

  // form.setFieldsValue(formData);

  return (
    <CustomDrawer
      title={"Change Permission"}
      width={1400}
      open={open}
      onClose={closeDrawer}
      isLoading={isFetching}
    >
      <CustomForm form={form} onClose={closeDrawer}>
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          showPaging={false}
          status={false}
          created_at={false}
          action={false}
          isRowSelection={true}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          changeSelectedRows={changeSelectedRows}
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

export default SetRolePermission;
