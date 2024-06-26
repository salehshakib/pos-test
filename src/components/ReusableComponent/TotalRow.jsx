import { Col, Row } from "antd";
import { fullColLayout } from "../../layout/FormLayout";

export const TotalRow = ({
  totalItems,
  totalQty,
  totalPrice,
  taxRate,
  discount,
  shippingCost,
  grandTotal,
}) => {
  return (
    <Row className="pb-20">
      <Col {...fullColLayout}>
        <Row className="rounded-md overflow-hidden">
          {[
            { label: "Items", value: `${totalItems} (${totalQty})` },
            { label: "Total", value: totalPrice },
            { label: "Tax", value: parseFloat(totalPrice * (taxRate / 100)) },
            { label: "Discount", value: discount },
            { label: "Shipping Cost", value: shippingCost },
            { label: "Grand Total", value: grandTotal },
          ].map(({ label, value }) => (
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-sm lg:text-base"
              key={label}
            >
              <span className="font-semibold">{label}</span>
              <span>
                {typeof value === "string"
                  ? value
                  : Number(value ?? 0)?.toFixed(2)}
              </span>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
