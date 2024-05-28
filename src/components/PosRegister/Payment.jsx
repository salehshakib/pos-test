import { Button } from "antd";
import { FaCreditCard } from "react-icons/fa";

const Payment = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className=" mx-10 grid grid-cols-3 lg:grid-cols-9 gap-3">
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Card
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Cash
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Draft
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Cheque
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Gift Card
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Deposit
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Points
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FaCreditCard />}
          className="flex justify-center items-center gap-2"
        >
          Recent Transactions
        </Button>
      </div>
    </div>
  );
};

export default Payment;
