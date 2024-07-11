import { Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  useGetAllPermissionQuery,
  useGetUserRolePermissionQuery,
} from "../../redux/services/rolePermission/rolePermissionApi";
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
      <span
        className="text-xs font-medium md:text-sm text-dark dark:text-white87 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        // className="text-xs font-medium md:text-sm text-dark dark:text-white87 flex flex-wrap  justify-start items-center gap-3 "
      >
        {text?.map((action, index) => {
          const label = action?.name?.split(".")[1];
          const isLongLabel = label && label.length > 15;

          return (
            <div
              key={action?.id ?? index}
              className={`${isLongLabel ? "col-span-2" : ""}`}
            >
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

function filterMissingObject(oldValue, newValue) {
  const newValueIds = {};
  newValue.forEach((obj) => {
    newValueIds[obj.id] = true;
  });

  const filteredObject = oldValue.find((obj) => !newValueIds[obj.id]);

  return filteredObject;
}

const actionKeys = [
  "accesstoken.issueToken",
  "authorization.authorize",
  "transienttoken.refresh",
  "approveauthorization.approve",
  "denyauthorization.deny",
  "authorizedaccesstoken.forUser",
  "authorizedaccesstoken.destroy",
  "client.forUser",
  "scope.all",
  "personalaccesstoken.forUser",
  "personalaccesstoken.store",
  "personalaccesstoken.destroy",
  "csrfcookie.show",
  "handlerequests.handleUpdate",
  "frontendassets.returnJavaScriptAsFile",
  "frontendassets.maps",
  "fileupload.handle",
  "filepreview.handle",
];

function filterActions(jsonData) {
  if (!jsonData) return [];

  let copiedData = JSON.parse(JSON.stringify(jsonData));

  let filteredModules = copiedData.filter((module) => {
    let filteredActions = module.actions.filter((action) => {
      return !actionKeys.includes(action.name);
    });

    module.actions = filteredActions;

    return filteredActions.length > 0;
  });

  return filteredModules;
}

const SetRolePermission = ({ changePermissionId, open, closeDrawer }) => {
  const [form] = Form.useForm();
  const formData = Form.useWatch("permission", form);

  const { data: rolePermission, isLoading } = useGetAllPermissionQuery();

  const filteredData = filterActions(rolePermission);

  const { data, isFetching } = useGetUserRolePermissionQuery(
    {
      params: {
        role_id: changePermissionId,
      },
    },
    {
      skip: !rolePermission,
    }
  );

  console.log(data);

  useEffect(() => {
    if (data && open) {
      data.map((item) => {
        console.log(item);
        item?.actions?.map((action) => {
          const label = action?.name?.split(".")[1];

          // form.setFieldsValue({
          //   permission: {
          //     [item.module]: {
          //       [label]: true,
          //     },
          //   },
          // });

          form.setFieldValue([`permission`, item.module, label], true);
        });
      });
    }
  }, [data, form, open]);

  console.log(formData);

  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);

  useEffect(() => {
    if (selectedRows.length) {
      selectedRows.map((item) => {
        item?.action?.map((action) => {
          const label = action?.name?.split(".")[1];

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

  const changeSelectedRows = (newSelectedRows) => {
    console.log(newSelectedRows);

    if (selectedRows?.length > newSelectedRows.length) {
      const deleteRow = filterMissingObject(selectedRows, newSelectedRows);

      deleteRow?.action?.map((action) => {
        const label = action?.name?.split(".")[1];

        form.setFieldsValue({
          permission: {
            [deleteRow.name]: {
              [label]: undefined,
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

  const dataSource =
    filteredData?.map((item) => {
      const { module, actions } = item ?? {};

      return {
        id: module,
        name: module,
        action: actions,
      };
    }) ?? [];

  function transformData(formData) {
    let transformedData = [];

    for (let key in formData) {
      let obj = {
        id: key,
        name: key,
        action: [],
      };

      let includeObject = false;

      if (formData[key]) {
        for (let actionKey in formData[key]) {
          if (formData[key][actionKey]) {
            let actionObj = {
              id: Math.floor(Math.random() * 100),
              name: `${key}.${actionKey}`,
            };
            obj.action.push(actionObj);
            includeObject = true;
          } else {
            includeObject = false;
            break;
          }
        }
      }

      if (includeObject) {
        transformedData.push(obj);
      }
    }

    return transformedData;
  }

  console.log(formData);

  const result = useMemo(() => transformData(formData), [formData]);

  useEffect(() => {
    if (result.length > 0) {
      setSelectedRows(result);
    }
  }, [result]);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <CustomDrawer
      title={"Change Permission"}
      width={1400}
      open={open}
      onClose={closeDrawer}
      isLoading={isLoading}
    >
      <CustomForm form={form} handleSubmit={handleSubmit}>
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
          // debounce={debounce}
          changeSelectedRows={changeSelectedRows}
          tableStyleProps={{
            scroll: {
              y: "73vh",
            },
          }}
          isLoading={isFetching}
        />
      </CustomForm>
    </CustomDrawer>
  );
};

export default SetRolePermission;
