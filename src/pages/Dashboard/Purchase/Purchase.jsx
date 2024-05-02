import { Button } from "antd";
import { GlobalUtilityStyle } from "../../../container/Styled";

const Purchase = () => {
  return (
    <GlobalUtilityStyle className="h-full">
      <div>
        <div>This is page header </div>
        <Button type="primary" className="">
          Open Drawer
        </Button>
      </div>
      <div className="bg-white rounded-md min-h-full p-6">This is purchase</div>
    </GlobalUtilityStyle>
  );
};

export default Purchase;
