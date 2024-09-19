import { Button } from 'antd';

const CustomButton = ({ isLoading = false, btnContent }) => {
  return (
    <Button
      key={btnContent}
      htmlType="submit"
      loading={isLoading}
      className="hover:bg-posPurple bg-secondary w-full pb-8 pt-2 font-bold"
      type="primary"
    >
      {btnContent}
    </Button>
  );
};

export default CustomButton;
