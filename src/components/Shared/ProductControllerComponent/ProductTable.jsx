import { Col } from "antd";
import { fullColLayout } from "../../../layout/FormLayout";
import CustomProductTable from "../Table/CustomProductTable";

const tableStyleProps = {
  // bordered: true,
  scroll: {
    y: 400,
    x: 1000,
  },
};
export const ProductTable = ({ columns, dataSource }) => {
  return (
    <Col {...fullColLayout} className="my-5">
      <CustomProductTable
        columns={columns}
        dataSource={dataSource}
        showPaging={false}
        tableStyleProps={tableStyleProps}
      />
    </Col>
  );
};
