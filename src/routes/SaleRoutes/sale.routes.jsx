import { CiGift } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import { LuClipboardType } from "react-icons/lu";
import { MdOutlineDesignServices } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import Coupons from "../../pages/Dashboard/Coupons/Coupons";
import GiftCardList from "../../pages/Dashboard/GiftCard/GiftCardList";
import GiftCardDesign from "../../pages/Dashboard/GiftCardDesign/GiftCardDesign";
import GiftCardType from "../../pages/Dashboard/GiftCardType/GiftCardType";
import SaleList from "../../pages/Dashboard/Sale/SaleList/SaleList";

export const salePaths = [
  {
    name: "Sale",
    path: "sale-list",
    icon: FaShoppingBasket,
    element: <SaleList />,
  },
  {
    name: "Gift Card Type",
    path: "gift-card-type",
    icon: LuClipboardType,
    element: <GiftCardType />,
  },
  {
    name: "Gift Card",
    path: "gift-card",
    icon: CiGift,
    element: <GiftCardList />,
  },
  {
    name: "Gift Card Design",
    path: "gift-card-design",
    icon: MdOutlineDesignServices,
    element: <GiftCardDesign />,
  },
  {
    name: "Coupons",
    path: "coupons",
    icon: RiCoupon3Line,
    element: <Coupons />,
  },
  // {
  //   name: "POS",
  //   path: "pos",
  //   // icon: TbDashboard,
  //   element: <Pos />,
  // },
  // {
  //   name: "Gift Card List",
  //   path: "gift-card-list",
  //   // icon: TbDashboard,
  //   element: <GiftCardList />,
  // },
  // {
  //   name: "Coupon List",
  //   path: "coupon-list",
  //   // icon: TbDashboard,
  //   element: <CouponList />,
  // },
  // {
  //   name: "Courier List",
  //   path: "courier-list",
  //   // icon: TbDashboard,
  //   element: <CourierList />,
  // },
  // {
  //   name: "Delivery List",
  //   path: "delivery-list",
  //   // icon: TbDashboard,
  //   element: <DeliveryList />,
  // },
];
