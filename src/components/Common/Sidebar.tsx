import React from "react";
import SidebarItem from "./SidebarItem";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { CiTimer } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`bg-blue-100 transition-width duration-300 gradient-sidebar shadow-md ${
        isOpen ? "w-60" : "w-0"
      } h-full`}
    >
      <div className="flex flex-col items-end py-6 px-3 rtl">
        <SidebarItem
          to="/dashboard"
          icon={<LuLayoutDashboard />}
          label="داشبورد"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/dashboard/projects"
          icon={<GoProjectRoadmap />}
          label="پروژه ها"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/projects/entry"
            icon={<GoProjectRoadmap />}
            label="وارد کردن"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/projects/list"
            icon={<GoProjectRoadmap />}
            label="لیست"
            isOpen={isOpen}
          />
        </SidebarItem>
        <SidebarItem
          to="/dashboard/work-time"
          icon={<CiTimer />}
          label="تایم کاری"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/work-time/entry"
            icon={<CiTimer />}
            label="وارد کردن"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/work-time/list"
            icon={<CiTimer />}
            label="لیست"
            isOpen={isOpen}
          />
        </SidebarItem>
        <SidebarItem
          to="/dashboard/tasks"
          icon={<FaTasks />}
          label="تسک ها"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/tasks/entry"
            icon={<FaTasks />}
            label="وارد کردن"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/tasks/list"
            icon={<FaTasks />}
            label="لیست"
            isOpen={isOpen}
          />
        </SidebarItem>

        <SidebarItem
          to="/dashboard/tickets"
          icon={<IoTicketOutline />}
          label="تیکت"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/tickets/new"
            icon={<IoTicketOutline />}
            label="ارسال"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/tickets/list"
            icon={<IoTicketOutline />}
            label="لیست"
            isOpen={isOpen}
          />
        </SidebarItem>
        <SidebarItem
          to="/dashboard/employee-info"
          icon={<IoIosInformationCircleOutline />}
          label="اطلاعات کارمندان"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/dashboard/accounting"
          icon={<MdOutlineAccountBalanceWallet />}
          label="حسابداری"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/accounting/dashboard"
            icon={<MdOutlineAccountBalanceWallet />}
            label="داشبورد حسابداری"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/accounting/add-transaction"
            icon={<MdOutlineAccountBalanceWallet />}
            label="وارد کردن تراکنش"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/accounting/employee-salaries"
            icon={<MdOutlineAccountBalanceWallet />}
            label="حقوق کارمندان"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/reports/list"
            icon={<MdOutlineAccountBalanceWallet />}
            label="تراکنش های واریزی و برداشتی"
            isOpen={isOpen}
          />
        </SidebarItem>
        <SidebarItem
          to="/dashboard/reports"
          icon={<TbReport />}
          label="گزارش کار"
          isOpen={isOpen}
        >
          <SidebarItem
            to="/dashboard/reports/entry"
            icon={<TbReport />}
            label="وارد کردن"
            isOpen={isOpen}
          />
          <SidebarItem
            to="/dashboard/reports/list"
            icon={<TbReport />}
            label="لیست"
            isOpen={isOpen}
          />
        </SidebarItem>
        <SidebarItem
          to="/dashboard/profile"
          icon={<FaRegUser />}
          label="پروفایل کاربری"
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default Sidebar;
