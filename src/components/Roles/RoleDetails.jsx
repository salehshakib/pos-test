import { Spin } from 'antd';

import { useGetRolePermissionDetailsQuery } from '../../redux/services/rolePermission/rolePermissionApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const transformPermissions = (modules) => {
  return modules.reduce((acc, module) => {
    module.actions.forEach((action) => {
      const key = `${module.module.toLowerCase()}_${action.name.split('.')[1]}`;
      acc[key] = 'True';
    });
    return acc;
  }, {});
};

export const RoleDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetRolePermissionDetailsQuery(
    {
      params: { role_id: id },
    },
    { skip: !id }
  );

  const transformedPermissions = data ? transformPermissions(data) : {};

  const details = useDetailsLayout(transformedPermissions);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Role" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
