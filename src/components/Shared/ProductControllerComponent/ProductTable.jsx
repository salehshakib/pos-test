import { Col } from "antd";
import { fullColLayout } from "../../../layout/FormLayout";
import CustomTable from "../Table/CustomTable";

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
      <CustomTable
        columns={columns}
        dataSource={dataSource}
        showPaging={false}
        tableStyleProps={tableStyleProps}
      />
    </Col>
  );
};
