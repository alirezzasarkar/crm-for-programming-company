import React, { useState } from "react";
import Swal from "sweetalert2";
import { createTransaction } from "../../services/Accounting"; // API service for transaction

const TransactionEntry: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const transactionType = form.transactionType.value;
    const amount = form.amount.value;
    const description = form.description.value;

    // Check if a file is selected
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileUrl = `https://adklay-crm.liara.run/media/invoices/${fileName}`;

      // Prepare transaction data to send
      const transactionData = {
        transaction_type: transactionType,
        amount: parseFloat(amount),
        description: description,
        file: fileUrl, // Use the constructed file URL
      };

      try {
        // Call the API to create a new transaction
        await createTransaction(transactionData);

        Swal.fire({
          title: "موفقیت",
          text: `تراکنش با موفقیت ذخیره شد. فایل پیوست شده: ${selectedFile.name}`,
          icon: "success",
          confirmButtonText: "باشه",
        });

        // Reset form fields
        form.reset();
        setSelectedFile(null);
      } catch (error) {
        Swal.fire({
          title: "خطا",
          text: "مشکلی در ذخیره تراکنش پیش آمد.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } else {
      Swal.fire({
        title: "خطا",
        text: "لطفاً یک فایل پیوست کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              نوع تراکنش
            </label>
            <select
              name="transactionType"
              className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 rtl text-gray-700"
            >
              <option value="income">واریز</option>
              <option value="expense">برداشت</option>
              <option value="salary">واریز حقوق</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              (به تومان) مقدار تراکنش
            </label>
            <input
              type="text"
              name="amount"
              className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              توضیحات
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-md text-right h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              پیوست فاکتور
            </label>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="w-full py-2 border border-gray-300 rounded-md text-gray-700 text-sm text-center block cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedFile ? selectedFile.name : "انتخاب فایل"}
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              ذخیره تراکنش
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionEntry;
