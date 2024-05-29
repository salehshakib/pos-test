import { Button } from "antd";
import { BsCash } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoRocketOutline } from "react-icons/io5";
import { MdCardGiftcard, MdOutlineCancel } from "react-icons/md";
import { PiHandDeposit } from "react-icons/pi";

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
          icon={<BsCash />}
          className="flex justify-center items-center gap-2"
        >
          Cash
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<FiFlag />}
          className="flex justify-center items-center gap-2"
        >
          Draft
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<HiOutlineBanknotes />}
          className="flex justify-center items-center gap-2"
        >
          Cheque
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<MdCardGiftcard />}
          className="flex justify-center items-center gap-2"
        >
          Gift Card
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<PiHandDeposit />}
          className="flex justify-center items-center gap-2"
        >
          Deposit
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<IoRocketOutline />}
          className="flex justify-center items-center gap-2"
        >
          Points
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<MdOutlineCancel />}
          className="flex justify-center items-center gap-2"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<GoHistory />}
          className="flex justify-center items-center gap-2"
        >
          Transactions
        </Button>
      </div>
    </div>
  );
};

export default Payment;
