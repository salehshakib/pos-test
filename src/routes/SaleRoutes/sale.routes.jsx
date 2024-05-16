import { CiGift } from "react-icons/ci";
import Coupons from "../../pages/Dashboard/Coupons/Coupons";
import GiftCardList from "../../pages/Dashboard/Sale/GiftCardList/GiftCardList";
import SaleList from "../../pages/Dashboard/Sale/SaleList/SaleList";
import { MdPointOfSale } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";

export const salePaths = [
  {
    name: "Sale List",
    path: "sale-list",
    icon: MdPointOfSale,
    element: <SaleList />,
  },

  {
    name: "Gift Card",
    path: "gift-card",
    icon: CiGift,
    element: <GiftCardList />,
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
