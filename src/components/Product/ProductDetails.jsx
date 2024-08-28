import { Descriptions, Spin, Table } from 'antd';
import { useSelector } from 'react-redux';

import { detailsLayout } from '../../layout/DescriptionLayout';
import { tableProps } from '../../layout/TableLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetProductDetailsQuery } from '../../redux/services/product/productApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { showCurrency } from '../../utilities/lib/currency';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const productQtyColumn = [
  {
    //name
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {name}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center',
    render: (qty) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {qty}
      </span>
    ),
  },
];

const priceQtyColumn = [
  {
    //name
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {name}
      </span>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (price) => (
      <span className="text-dark dark:text-white87 text-xs md:text-sm">
        {price}
      </span>
    ),
  },
];

export const ProductDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetProductDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const basicInfo = useDetailsLayout({
    name: data?.name,
    sku: data?.sku,
    type: data?.type,
    symbology: data?.symbology,
  });

  const categoryInfo = useDetailsLayout({
    brand: data?.brands?.name,
    category: data?.categories?.name,
    unit: data?.units?.name,
    purchase_unit: data?.purchase_units?.name,
    sale_unit: data?.sale_units?.name,
  });

  const pricingInfo = useDetailsLayout({
    buying_price: data?.buying_price,
    selling_price: data?.selling_price,
    profit: data?.profit,
  });

  const inventoryInfo = useDetailsLayout({
    has_stock: data?.has_stock,
    quantity: data?.qty,
    alert_qty: data?.alert_qty,
    daily_sale_qty: data?.daily_sale_qty,
    qty_list: data?.qty_list,
  });

  const qtyTitle = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Warehouse Inventory List
    </span>
  );

  const qtyDataSource = data?.product_qties?.map((item) => {
    return {
      id: item?.warehouses?.id,
      name: item?.warehouses?.name ?? 'Unknown Warehouse',
      qty: item?.qty ?? 'Unknown Quantity',
    };
  });

  const featuresInfo = useDetailsLayout({
    has_featured: data?.has_featured,
    has_promotion: data?.has_promotion,
    promotion_price: data?.promotion_price,
    starting_date: data?.starting_date,
    last_date: data?.last_date,
    has_different_price: data?.has_different_price,
    has_expired_date: data?.has_expired_date,
    expired_date: data?.expired_date,
  });

  const variantsInfo = useDetailsLayout({
    has_variants: data?.has_variant,
    variant_list: data?.variant_list,
  });

  const taxInfo = useDetailsLayout({
    tax: data?.taxes?.rate,
    tax_method: data?.tax_method,
  });

  // const miscellaneousInfo = useDetailsLayout({
  //   ecommerce_sync: data?.ecommerce_sync,
  //   embedded_barcode: data?.embedded_barcode,
  // });

  const productAttachments = useDetailsLayout(
    {
      attachments: data?.attachments,
    },
    true
  );

  const priceTitle = () => (
    <span className="-ml-2 text-base font-semibold text-black">
      Warehouse Price List
    </span>
  );

  const currency = useSelector(useCurrency);

  const priceDataSource = data?.product_prices?.map((item) => {
    return {
      id: item?.warehouses?.id,
      name: item?.warehouses?.name ?? 'Unknown Warehouse',
      price: showCurrency(item?.price, currency) ?? 'Unknown Quantity',
    };
  });

  console.log(data?.details);

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="Basic Info" items={basicInfo} />
          <CustomDescription title="Category & Units" items={categoryInfo} />
          <CustomDescription title="Inventory Info" items={inventoryInfo} />
          <Table
            {...tableProps}
            title={qtyTitle}
            columns={productQtyColumn}
            dataSource={qtyDataSource}
          />
          <CustomDescription title="Pricing Info" items={pricingInfo} />
          <Table
            {...tableProps}
            title={priceTitle}
            columns={priceQtyColumn}
            dataSource={priceDataSource}
          />

          <CustomDescription title="Features Info" items={featuresInfo} />
          <CustomDescription title="Variant Info" items={variantsInfo} />
          <CustomDescription title="Vat Info" items={taxInfo} />

          <CustomDescription
            title="Attachments"
            items={productAttachments}
            nostyle={true}
          />

          <Descriptions {...detailsLayout} title="Additional Info">
            <Descriptions.Item label="Details" className="overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: data?.details }}></div>

              {/* <iframe
                title="HTML Output"
                style={{
                  width: "100%",
                  height: "600px",
                }}
                className="overflow-auto"
                srcDoc={
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.details }}
                  ></div>
                }
              /> */}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </CustomModal>
  );
};
