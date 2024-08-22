import { Spin } from 'antd';
import { useGetEmployeeDetailsQuery } from '../../redux/services/hrm/employee/employeeApi';
import createDetailsLayout from '../../utilities/lib/createDetailsLayout';
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

  const details = createDetailsLayout(data, false, [
    'employee_accesses',
    'users',
    'stock_request_products',
  ]);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center my-10" />
      ) : (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pt-3 pb-5">
          <CustomDescription title="Employee" items={details} />
        </div>
      )}
    </CustomModal>
  );
};
