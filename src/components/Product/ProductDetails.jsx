import { Descriptions, Spin } from "antd";
import { desLayout, detailsLayout } from "../../layout/DescriptionLayout";
import { useGetProductDetailsQuery } from "../../redux/services/product/productApi";
import createDetailsLayout from "../../utilities/lib/createDetailsLayout";
import CustomModal from "../Shared/Modal/CustomModal";
import parse from "html-react-parser";

export const ProductDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetProductDetailsQuery({ id }, { skip: !id });

  console.log(data);

  // const details = createDetailsLayout(data);

  // console.log(details);

  const basicInfo = createDetailsLayout({
    name: data?.name,
    sku: data?.sku,
    type: data?.type,
    symbology: data?.symbology,
  });

  const categoryInfo = createDetailsLayout({
    brand_id: data?.brand_id,
    category_id: data?.category_id,
    unit_id: data?.unit_id,
    purchase_unit_id: data?.purchase_unit_id,
    sale_unit_id: data?.sale_unit_id,
  });

  const pricingInfo = createDetailsLayout({
    buying_price: data?.buying_price,
    selling_price: data?.selling_price,
    profit: data?.profit,

    // tax_method: data?.tax_method,
    // tax_id: data?.tax_id,
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
    tax_id: data?.tax_id,
    tax_method: data?.tax_method,
  });

  const miscellaneousInfo = createDetailsLayout({
    ecommerce_sync: data?.ecommerce_sync,
    embedded_barcode: data?.embedded_barcode,
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="w-full flex justify-center items-center mt-10" />
      ) : (
        <div className="space-y-5">
          <Descriptions {...desLayout} title="Basic Info" items={basicInfo} />
          <Descriptions
            {...desLayout}
            title="Category & Units"
            items={categoryInfo}
          />
          <Descriptions
            {...desLayout}
            title="Pricing Info"
            items={pricingInfo}
          />
          <Descriptions
            {...desLayout}
            title="Inventory Info"
            items={inventoryInfo}
          />
          <Descriptions
            {...desLayout}
            title="Features Info"
            items={featuresInfo}
          />
          <Descriptions
            {...desLayout}
            title="Variant Info"
            items={variantsInfo}
          />
          <Descriptions {...desLayout} title="Tax Info" items={taxInfo} />
          <Descriptions
            {...desLayout}
            title="Miscellaneous Info"
            items={miscellaneousInfo}
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
