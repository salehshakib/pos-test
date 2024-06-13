import { CiDesktop } from "react-icons/ci";
import { FaBuilding } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdPayment, MdTimeToLeave } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Department from "../../pages/Dashboard/Department/Department";
import Designation from "../../pages/Dashboard/Designation/Designation";
import Employee from "../../pages/Dashboard/Employee/Employee";
import { Holidays } from "../../pages/Dashboard/Holidays/Holidays";
import { Leave } from "../../pages/Dashboard/Leave/Leave";
import { Payroll } from "../../pages/Dashboard/Payroll/Payroll";

export const hrmPaths = [
  {
    name: "Department",
    path: "department",
    icon: FaBuilding,
    element: <Department />,
  },
  {
    name: "Designation",
    path: "designation",
    icon: CiDesktop,
    element: <Designation />,
  },
  {
    name: "Employee",
    path: "employee",
    icon: FaPeopleRoof,
    element: <Employee />,
  },
  {
    name: "Leave",
    path: "leave",
    icon: SlCalender,
    element: <Leave />,
  },
  {
    name: "Payroll",
    path: "payroll",
    icon: MdPayment,
    element: <Payroll />,
  },
  {
    name: "Holidays",
    path: "holidays",
    icon: MdTimeToLeave,
    element: <Holidays />,
  },
];
