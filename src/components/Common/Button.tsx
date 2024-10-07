import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  hoverClass?: string;
  children: React.ReactNode;
  disabled?: boolean; // Added disabled prop
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  hoverClass = "hover:bg-blue-600",
  children,
  disabled = false, // Default value for disabled
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ${hoverClass} ${className}`}
      disabled={disabled} // Set disabled attribute
    >
      {children}
    </button>
  );
};

export default Button;
