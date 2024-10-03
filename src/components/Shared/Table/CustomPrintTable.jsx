import { Table } from 'antd';
import { forwardRef } from 'react';

import { useSiteLogo } from '../../../utilities/hooks/useSiteLogo';

const CustomPrintTable = forwardRef(({ data = [[]] }, ref) => {
  const excludedFields = [
    'id',
    'user_id',
    'created_at',
    'updated_at',
    'deleted_at',
    'account_id',
    'balance_id',
    'key',
    'status',
  ];

  const logo = useSiteLogo();
  const combinedData = data.flat();

  if (!combinedData || combinedData.length === 0) {
    return <p className="text-center my-10">No Data Found</p>;
  }

  const headers = Object.keys(combinedData[0]).filter(
    (header) => !excludedFields.includes(header)
  );

  const formatHeader = (header) => {
    return header
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const columns = headers.map((header) => ({
    title: formatHeader(header),
    dataIndex: header,
    key: header,
  }));

  return (
    <div className="p-4">
      <div ref={ref} className="px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Report</h2>
          <img src={logo} alt="Logo" className="size-32" />
        </div>

        <Table
          columns={columns}
          dataSource={combinedData}
          pagination={false}
          rowKey={(record, index) => index}
          bordered
          className="w-[1000px]"
          size="small"
        />
      </div>
    </div>
  );
});

CustomPrintTable.displayName = 'CustomPrintTable';

export default CustomPrintTable;
