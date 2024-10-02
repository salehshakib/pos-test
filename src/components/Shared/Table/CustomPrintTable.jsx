import { forwardRef } from 'react';

const CustomPrintTable = forwardRef(({ data = [] }, ref) => {
  const excludedFields = [
    'id',
    'user_id',
    'created_at',
    'updated_at',
    'deleted_at',
    'account_id',
    'balance_id',
  ];

  if (!data || data?.length === 0) {
    return;
  }

  const headers = Object.keys(data[0]).filter(
    (header) => !excludedFields.includes(header)
  );

  const formatHeader = (header) => {
    return header
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="p-4">
      <div ref={ref}>
        {!data || data?.length === 0 ? (
          'No Data Found'
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {headers.map((header, index) => (
                  <th
                    key={index + 1}
                    className="px-4 py-2 border border-gray-300 text-left"
                  >
                    {formatHeader(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {headers.map((header, cellIndex) => (
                    <td
                      key={cellIndex + 1}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

CustomPrintTable.displayName = 'CustomPrintTable';

export default CustomPrintTable;
