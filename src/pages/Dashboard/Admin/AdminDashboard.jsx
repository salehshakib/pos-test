import { Button } from "antd";

const AdminDashboard = () => {
  return (
    <div className="h-full">
      <div>This is page header</div>
      <Button type="primary">Hello</Button>
      <div className="bg-white rounded-md min-h-full p-6">
        This is home dash
      </div>
    </div>
  );
};

export default AdminDashboard;
