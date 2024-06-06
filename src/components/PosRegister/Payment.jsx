import { Button } from "antd";
import { BsCash } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoRocketOutline } from "react-icons/io5";
import { MdCardGiftcard } from "react-icons/md";
import { PiHandDeposit } from "react-icons/pi";

const Payment = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="mx-auto grid grid-cols-4 lg:grid-cols-8 gap-x-3 gap-y-2">
        <Button
          type="primary"
          icon={<FaCreditCard />}
          className=" flex justify-center items-center min-w-fit"
        >
          Card
        </Button>
        <Button
          type="primary"
          icon={<BsCash />}
          className=" flex justify-center items-center min-w-fit"
        >
          Cash
        </Button>
        <Button
          type="primary"
          icon={<FiFlag />}
          className=" flex justify-center items-center min-w-fit"
        >
          Draft
        </Button>
        <Button
          type="primary"
          icon={<HiOutlineBanknotes />}
          className=" flex justify-center items-center min-w-fit"
        >
          Cheque
        </Button>
        <Button
          type="primary"
          icon={<MdCardGiftcard />}
          className=" flex justify-center items-center min-w-fit"
        >
          Gift Card
        </Button>
        <Button
          type="primary"
          icon={<PiHandDeposit />}
          className=" flex justify-center items-center min-w-fit"
        >
          Deposit
        </Button>
        <Button
          type="primary"
          icon={<IoRocketOutline />}
          className=" flex justify-center items-center min-w-fit"
        >
          Points
        </Button>
        {/* <Button
          type="primary"
          icon={<MdOutlineCancel />}
          className=" flex justify-center items-center min-w-fit"
        >
          Cancel
        </Button> */}
        <Button
          type="primary"
          icon={<GoHistory />}
          className=" flex justify-center items-center min-w-fit"
        >
          Transactions
        </Button>
      </div>
    </div>
  );
};

export default Payment;
