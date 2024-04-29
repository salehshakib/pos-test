import { Button } from "antd";

const Purchase = () => {
  return (
    <div className="h-full">
      <div>
        <div>This is page header </div>
        <Button type="primary" className="bg-secondary hover:bg-primary">
          Open Drawer
        </Button>
      </div>
      <div className="bg-white rounded-md min-h-full p-6">This is purchase</div>
    </div>
  );
};

export default Purchase;
