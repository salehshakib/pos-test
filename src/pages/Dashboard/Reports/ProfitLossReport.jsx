import { Button, Descriptions, Modal, Row, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { WarehouseFilter } from '../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent';
import GlobalContainer from '../../../container/GlobalContainer/GlobalContainer';
import { rowLayout } from '../../../layout/FormLayout';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetProfitLossReportQuery } from '../../../redux/services/reports/protiLossReportApi';
import { useCustomDebounce } from '../../../utilities/hooks/useDebounce';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { useSiteLogo } from '../../../utilities/hooks/useSiteLogo';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const SearchComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter name="warehouse_ids" multiple={true} fullLayout={true} />
    </Row>
  );
};

const ProfitLossReport = () => {
  const { keyword, debounce } = useCustomDebounce();
  const { searchParams, setParams } = useFilterParams();

  const [segment, setSegment] = useState('Weekly');

  const onSegmentChange = (value) => {
    setSegment(value);
  };

  useEffect(() => {
    const dateRange = getDateRange(segment);
    setParams((prev) => ({
      ...prev,
      sale_daterange: dateRange,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const date_range = searchParams?.created_daterange ?? getDateRange(segment);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Sale Details',
  });

  const [openPrint, setOpenPrint] = useState(false);

  const { data, isFetching } = useGetProfitLossReportQuery({
    params: { date_range },
    keyword,
  });

  const currency = useSelector(useCurrency);
  const logo = useSiteLogo();

  return (
    <GlobalContainer
      pageTitle="Profit Loss Report"
      popoverWidth={400}
      debounce={debounce}
      setParams={setParams}
      segment={segment}
      onSegmentChange={onSegmentChange}
      searchFilterContent={<SearchComponent />}
      setOpenPrint={setOpenPrint}
    >
      {isFetching && (
        <div className="flex justify-center items-center h-screen">
          <Spin />
        </div>
      )}
      {data?.results?.profit_loss && (
        <Descriptions
          bordered
          className="my-10 mx-auto max-w-xl"
          layout="horizontal"
          column={1}
        >
          {Object.entries(data?.results?.profit_loss)?.map(([key, value]) => (
            <Descriptions.Item
              key={key}
              label={key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            >
              {currency?.name} {value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}

      <Modal
        title={
          <div className="flex items-center gap-4">
            <h2>Print Report</h2>
            <Button
              key={'print'}
              type="primary"
              onClick={handlePrint}
              className="px-12 py-4"
            >
              Print
            </Button>
          </div>
        }
        open={openPrint}
        onCancel={() => setOpenPrint(false)}
        footer={null}
        width={1000}
      >
        <div ref={printRef} className="p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Report</h2>
            <img src={logo} alt="Logo" className="size-32" />
          </div>

          {data?.results?.profit_loss && (
            <Descriptions
              className="mb-10"
              layout="horizontal"
              column={1}
              bordered
            >
              {Object.entries(data?.results?.profit_loss)?.map(
                ([key, value]) => (
                  <Descriptions.Item
                    key={key}
                    label={
                      <div className="font-bold text-black">
                        {key
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </div>
                    }
                  >
                    {currency?.name} {value}
                  </Descriptions.Item>
                )
              )}
            </Descriptions>
          )}
        </div>
      </Modal>
    </GlobalContainer>
  );
};

export default ProfitLossReport;
