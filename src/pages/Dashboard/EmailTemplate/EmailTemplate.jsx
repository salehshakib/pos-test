import { useState } from 'react';

import { EmailTemplateCreate } from '../../../components/EmailTemplate/EmailTemplateCreate';
import { EmailTemplateTable } from '../../../components/EmailTemplate/EmailTemplateTable';
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {act}
      </span>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {name}
      </span>
    ),
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: (subject) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {subject}
      </span>
    ),
  },
];

const EmailTemplate = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Email Template"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={EMAIL_TEMPLATE}
    >
      <EmailTemplateCreate />

      <EmailTemplateTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default EmailTemplate;
