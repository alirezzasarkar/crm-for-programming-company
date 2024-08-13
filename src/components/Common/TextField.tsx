import { forwardRef } from "react";

interface TextFieldProps {
  type: string;
  placeholder: string;
  pattern?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type, placeholder, pattern, ...rest }, ref) => {
    return (
      <div className="flex items-center space-x-4">
        <input
          type={type}
          placeholder={placeholder}
          pattern={pattern}
          ref={ref}
          {...rest}
          className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:border-blue-300 text-right"
        />
      </div>
    );
  }
);

export default TextField;
