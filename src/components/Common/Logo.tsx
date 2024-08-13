import React from "react";
import logoImage from "../../assets/images/logo.png"; // مسیر به تصویر لوگو

interface LogoProps {
  height?: number; // اندازه لوگو، مقدار پیش‌فرض را تعریف کنید
  width?: number; // اندازه لوگو، مقدار پیش‌فرض را تعریف کنید
}

const Logo: React.FC<LogoProps> = ({ height = 90, width = 150 }) => {
  return (
    <div className="flex justify-center mb-4">
      <img
        src={logoImage}
        alt="Logo"
        style={{ width: width, height: height }} // تنظیم اندازه لوگو با استفاده از style
      />
    </div>
  );
};

export default Logo;
