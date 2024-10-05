import { useState } from 'react';

import SmsTemplateCreate from '../../../components/SmsTemplate/SmsTemplateCreate';
import SmsTemplateTable from '../../../components/SmsTemplate/SmsTemplateTable';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { EMAIL_TEMPLATE } from '../../../utilities/apiEndpoints/helper.api';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';

const columns = [
  {
    title: 'Act',
    dataIndex: 'act',
    key: 'act',
    render: (act) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{act}</span>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{name}</span>
    ),
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: (subject) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {subject}
      </span>
    ),
  },
];

const SmsTemplate = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="SMS Template"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={EMAIL_TEMPLATE}
    >
      <SmsTemplateCreate />

      <SmsTemplateTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default SmsTemplate;
