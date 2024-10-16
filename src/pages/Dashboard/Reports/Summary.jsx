import { Form, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ReportContainer } from '../../../container/ReportContainer/ReportContainer';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetReportSummaryQuery } from '../../../redux/services/reports/summaryApi';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import { showCurrency } from '../../../utilities/lib/currency';
import { getDateRange } from '../../../utilities/lib/getDateRange';

const styleProps = {
  scroll: {
    x: 'max-content',
  },
  pagination: false,
  bordered: true,
};

const columns = [
  {
    title: 'Total Purchase',
    dataIndex: 'totalPurchase',
    key: 'totalPurchase',
    align: 'center',
    render: (totalPurchase) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {totalPurchase}
      </span>
    ),
  },
  {
    title: 'Paid Amount',
    dataIndex: 'paidAmount',
    key: 'paidAmount',
    align: 'right',
    render: (paidAmount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {paidAmount}
      </span>
    ),
  },

  {
    title: 'Shipping Cost',
    dataIndex: 'shippingCost',
    align: 'right',
    key: 'shippingCost',
    render: (shippingCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {shippingCost}
      </span>
    ),
  },
  {
    title: 'Vat',
    dataIndex: 'tax',
    align: 'right',
    key: 'tax',
    render: (tax) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{tax}</span>
    ),
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    align: 'right',
    key: 'discount',
    render: (discount) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {discount}
      </span>
    ),
  },
  {
    title: 'Grand Total',
    dataIndex: 'grandTotal',
    align: 'right',
    key: 'grandTotal',
    render: (grandTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {grandTotal}
      </span>
    ),
  },
];

const PurchaseSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Purchase Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = data?.purchase?.map((item) => {
    return {
      totalPurchase: data?.total_purchase,
      paidAmount: showCurrency(item?.paid_amount, currency),
      shippingCost: showCurrency(item?.shipping_cost, currency),
      tax: showCurrency(item?.tax, currency),
      discount: showCurrency(item?.discount, currency),
      grandTotal: showCurrency(item?.grand_total, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const SaleSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">Sale Summary</div>
    ),
    ...styleProps,
  };

  const dataSource = data?.sale?.map((item) => {
    return {
      totalPurchase: data?.total_sale,
      paidAmount: showCurrency(item?.paid_amount, currency),
      shippingCost: showCurrency(item?.shipping_cost, currency),
      tax: showCurrency(item?.tax, currency),
      discount: showCurrency(item?.discount, currency),
      grandTotal: showCurrency(item?.grand_total, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const PurchaseReturnSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Total Purchase Return',
      dataIndex: 'totalPurchase',
      key: 'totalPurchase',
      align: 'center',
      render: (totalPurchase) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {totalPurchase}
        </span>
      ),
    },
    {
      title: 'Vat',
      dataIndex: 'tax',
      align: 'right',
      key: 'tax',
      render: (tax) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {tax}
        </span>
      ),
    },

    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      align: 'right',
      key: 'grandTotal',
      render: (grandTotal) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {grandTotal}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Purchase Return Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = data?.sale?.map((item) => {
    return {
      totalPurchase: data?.total_purchase_return,
      tax: showCurrency(item?.tax, currency),
      grandTotal: showCurrency(item?.grand_total, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const SaleReturnSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Total Sale Return',
      dataIndex: 'totalPurchase',
      key: 'totalPurchase',
      align: 'center',
      render: (totalPurchase) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {totalPurchase}
        </span>
      ),
    },
    {
      title: 'Vat',
      dataIndex: 'tax',
      align: 'right',
      key: 'tax',
      render: (tax) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {tax}
        </span>
      ),
    },

    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      align: 'right',
      key: 'grandTotal',
      render: (grandTotal) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {grandTotal}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Sale Return Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = data?.sale?.map((item) => {
    return {
      totalPurchase: data?.total_sale,
      tax: showCurrency(item?.tax, currency),
      grandTotal: showCurrency(item?.grand_total, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const PaymentReceivedSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Payment Received Number',
      dataIndex: 'payment_recieved_number',
      key: 'payment_recieved_number',
      align: 'center',
      render: (payment_recieved_number) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {payment_recieved_number}
        </span>
      ),
    },
    {
      title: 'Card',
      dataIndex: 'card',
      key: 'card',
      align: 'center',
      render: (card) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {card}
        </span>
      ),
    },
    {
      title: 'Cheque',
      dataIndex: 'cheque',
      key: 'cheque',
      align: 'center',
      render: (cheque) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {cheque}
        </span>
      ),
    },
    {
      title: 'Gift Card',
      dataIndex: 'giftCard',
      key: 'giftCard',
      align: 'center',
      render: (giftCard) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {giftCard}
        </span>
      ),
    },
    {
      title: 'Cash',
      dataIndex: 'cash',
      key: 'cash',
      align: 'center',
      render: (cash) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {cash}
        </span>
      ),
    },
    {
      title: 'Total Payment Received',
      dataIndex: 'payment_recieved',
      key: 'payment_recieved',
      align: 'right',
      render: (payment_recieved) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {payment_recieved}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Payment Received Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = [
    {
      payment_recieved_number: data?.payment_recieved_number,
      card: data?.card_payment_sale,
      cheque: data?.cheque_payment_sale,
      giftCard: data?.gift_card_payment_sale,
      cash: data?.cash_payment_sale,
      payment_recieved: showCurrency(data?.payment_recieved, currency),
    },
  ];

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const PaymentSentSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Payment Sent Number',
      dataIndex: 'payment_sent_number',
      key: 'payment_sent_number',
      align: 'center',
      render: (payment_sent_number) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {payment_sent_number}
        </span>
      ),
    },
    {
      title: 'Card',
      dataIndex: 'card',
      key: 'card',
      align: 'center',
      render: (card) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {card}
        </span>
      ),
    },
    {
      title: 'Cheque',
      dataIndex: 'cheque',
      key: 'cheque',
      align: 'center',
      render: (cheque) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {cheque}
        </span>
      ),
    },
    {
      title: 'Cash',
      dataIndex: 'cash',
      key: 'cash',
      align: 'center',
      render: (cash) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {cash}
        </span>
      ),
    },
    {
      title: 'Total Payment Sent',
      dataIndex: 'payment_sent',
      key: 'payment_sent',
      align: 'right',
      render: (payment_sent) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {payment_sent}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Payment Sent Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = [
    {
      payment_sent_number: data?.payment_sent_number,
      card: data?.card_payment_purchase,
      cheque: data?.cheque_payment_purchase,
      cash: data?.cash_payment_purchase,
      payment_sent: showCurrency(data?.payment_sent, currency),
    },
  ];

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const ExpenseSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
      align: 'center',
      render: (expense) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {expense}
        </span>
      ),
    },

    {
      title: 'Total Expenses',
      dataIndex: 'totalExpenses',
      align: 'right',
      key: 'totalExpenses',
      render: (totalExpenses) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {totalExpenses}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Expense Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = data?.sale?.map((item) => {
    return {
      expense: data?.expense,
      totalExpenses: showCurrency(item?.total_expense, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

const PayrollSummaryTable = ({ data }) => {
  const currency = useSelector(useCurrency);
  const columns = [
    {
      title: 'Payroll',
      dataIndex: 'payroll',
      key: 'payroll',
      align: 'center',
      render: (payroll) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {payroll}
        </span>
      ),
    },

    {
      title: 'Total Payroll',
      dataIndex: 'totalPayroll',
      align: 'right',
      key: 'totalPayroll',
      render: (totalPayroll) => (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {totalPayroll}
        </span>
      ),
    },
  ];

  const tableStyleProps = {
    title: () => (
      <div className="pl-0 text-lg font-semibold underline">
        Payroll Summary
      </div>
    ),
    ...styleProps,
  };

  const dataSource = data?.sale?.map((item) => {
    return {
      payroll: data?.payroll,
      totalPayroll: showCurrency(item?.total_payroll, currency),
    };
  });

  return (
    <Table {...tableStyleProps} columns={columns} dataSource={dataSource} />
  );
};

export const Summary = () => {
  const [reportForm] = Form.useForm();

  const { searchParams, setParams } = useFilterParams();
  const [segment, setSegment] = useState('Weekly');

  const { data } = useGetReportSummaryQuery(
    { params: searchParams },
    { skip: Object.keys(searchParams).length === 0 }
  );

  const onSegmentChange = (value) => {
    setSegment(value);
  };

  const onDateChange = (_, dateString) => {
    if (dateString[0] && dateString[1]) {
      setParams((prev) => ({
        ...prev,
        date_range: dateString,
      }));
    } else {
      const dateRange = getDateRange(segment);
      setParams((prev) => ({
        ...prev,
        daterange: dateRange,
      }));
    }
  };

  useEffect(() => {
    const dateRange = getDateRange(segment);
    setParams((prev) => ({
      ...prev,
      date_range: dateRange,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  return (
    <ReportContainer
      pageTitle="Summary"
      form={reportForm}
      onDateChange={onDateChange}
      segment={segment}
      onSegmentChange={onSegmentChange}
    >
      <div className="w-full pb-2 text-right font-semibold underline">
        Showing Data From All Warehouse
      </div>
      <div className="space-y-5">
        <PurchaseSummaryTable data={data} />
        <SaleSummaryTable data={data} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <PurchaseReturnSummaryTable data={data} />
          <SaleReturnSummaryTable data={data} />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ExpenseSummaryTable data={data} />
          <PayrollSummaryTable data={data} />
        </div>
        <PaymentReceivedSummaryTable data={data} />
        <PaymentSentSummaryTable data={data} />
      </div>
    </ReportContainer>
  );
};
