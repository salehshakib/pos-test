import CouponList from "../../pages/Dashboard/Sale/CouponList/CouponList";
import CourierList from "../../pages/Dashboard/Sale/CourierList/CourierList";
import DeliveryList from "../../pages/Dashboard/Sale/DeliveryList/DeliveryList";
import GiftCardList from "../../pages/Dashboard/Sale/GiftCardList/GiftCardList";
import Pos from "../../pages/Dashboard/Sale/Pos/Pos";
import SaleList from "../../pages/Dashboard/Sale/SaleList/SaleList";

export const salePaths = [
  {
    name: "Sale List",
    path: "sale-list",
    // icon: TbDashboard,
    element: <SaleList />,
  },
  {
    name: "POS",
    path: "pos",
    // icon: TbDashboard,
    element: <Pos />,
  },
  {
    name: "Gift Card List",
    path: "gift-card-list",
    // icon: TbDashboard,
    element: <GiftCardList />,
  },
  {
    name: "Coupon List",
    path: "coupon-list",
    // icon: TbDashboard,
    element: <CouponList />,
  },
  {
    name: "Courier List",
    path: "courier-list",
    // icon: TbDashboard,
    element: <CourierList />,
  },
  {
    name: "Delivery List",
    path: "delivery-list",
    // icon: TbDashboard,
    element: <DeliveryList />,
  },
];
