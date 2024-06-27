import { Descriptions, Spin } from "antd";
import parse from "html-react-parser";
import { detailsLayout } from "../../layout/DescriptionLayout";
import { useGetProductDetailsQuery } from "../../redux/services/product/productApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import { CustomDescription } from "../Shared/Description/CustomDescription";
import CustomModal from "../Shared/Modal/CustomModal";

export const ProductDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetProductDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        // child: 1,
      },
    },
    { skip: !id }
  );

  //console.log(data);

  const basicInfo = createDetailsLayout({
    name: data?.name,
    sku: data?.sku,
    type: data?.type,
    symbology: data?.symbology,
  });

  const categoryInfo = createDetailsLayout({
    brand: data?.brands?.name,
    category: data?.categories?.name,
    unit: data?.units?.name,
    purchase_unit: data?.purchase_units?.name,
    sale_unit: data?.sale_units?.name,
  });

  const pricingInfo = createDetailsLayout({
    buying_price: data?.buying_price,
    selling_price: data?.selling_price,
    profit: data?.profit,
  });

  const inventoryInfo = createDetailsLayout({
    has_stock: data?.has_stock,
    quantity: data?.qty,
    alert_qty: data?.alert_qty,
    daily_sale_qty: data?.daily_sale_qty,
    qty_list: data?.qty_list,
  });

  const featuresInfo = createDetailsLayout({
    has_featured: data?.has_featured,
    has_promotion: data?.has_promotion,
    promotion_price: data?.promotion_price,
    starting_date: data?.starting_date,
    last_date: data?.last_date,
    has_different_price: data?.has_different_price,
    has_expired_date: data?.has_expired_date,
    expired_date: data?.expired_date,
  });

  const variantsInfo = createDetailsLayout({
    has_variants: data?.has_variant,
    variant_list: data?.variant_list,
  });

  const taxInfo = createDetailsLayout({
    tax: data?.taxs?.name,
    tax_method: data?.tax_method,
  });

  // const miscellaneousInfo = createDetailsLayout({
  //   ecommerce_sync: data?.ecommerce_sync,
  //   embedded_barcode: data?.embedded_barcode,
  // });

  const productAttachments = createDetailsLayout(
    {
      attachments: data?.attachments,
    },
    true
  );

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <div className="space-y-5">
          <CustomDescription title="Basic Info" items={basicInfo} />
          <CustomDescription title="Category & Units" items={categoryInfo} />
          <CustomDescription title="Pricing Info" items={pricingInfo} />
          <CustomDescription title="Inventory Info" items={inventoryInfo} />
          <CustomDescription title="Features Info" items={featuresInfo} />
          <CustomDescription title="Variant Info" items={variantsInfo} />
          <CustomDescription title="Tax Info" items={taxInfo} />
          {/* <CustomDescription
            title="Miscellaneous Info"
            items={miscellaneousInfo}
          /> */}

          <CustomDescription
            title="Attachments"
            items={productAttachments}
            nostyle={true}
          />

          <Descriptions {...detailsLayout} title="Additional Info">
            <Descriptions.Item label="Details">
              <div>{parse(data?.details)}</div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </CustomModal>
  );
};
