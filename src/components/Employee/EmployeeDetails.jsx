import { Spin } from 'antd';
import { useGetEmployeeDetailsQuery } from '../../redux/services/hrm/employee/employeeApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

export const EmployeeDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetEmployeeDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const details = useDetailsLayout(data, false, [
    'employee_accesses',
    'users',
    'stock_request_products',
  ]);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pb-5 pt-3">
          <CustomDescription title="Employee" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
