// errorHandler.ts
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import axios from 'axios';

export interface ApiErrorResponse {
  message?: string;
  // سایر ویژگی‌ها را در صورت لزوم اضافه کنید
}

export const handleApiError = (error: unknown) => {
  let title = 'خطا';
  let message = 'خطای ناشناخته';

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // بررسی وضعیت کد خطا و موجود بودن response
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          title = 'خطای درخواست';
          
          // بررسی پیام خطای خاص "You have already submitted a report for today."
          if (axiosError.response.data?.message === "You have already submitted a report for today.") {
            message = 'شما گزارش کار امروز را ارسال کرده‌اید.';
          } else {
            message = axiosError.response.data?.message || 'درخواست شما نادرست است.';
          }
          break;

        case 401:
          title = 'عدم مجوز';
          message = axiosError.response.data?.message || 'شما مجاز به انجام این عملیات نیستید.';
          break;

        case 403:
          title = 'دسترسی ممنوع';
          message = axiosError.response.data?.message || 'دسترسی شما به این منبع مسدود شده است.';
          break;

        case 404:
          title = 'یافت نشد';
          message = axiosError.response.data?.message || 'منبع درخواستی یافت نشد.';
          break;

        case 500:
          title = 'خطای سرور';
          message = axiosError.response.data?.message || 'مشکلی در سرور رخ داده است.';
          break;

        default:
          title = 'خطا';
          message = axiosError.response.data?.message || 'یک خطا رخ داده است.';
          break;
      }
    } else {
      // اگر response موجود نباشد
      title = 'خطا';
      message = 'پاسخی از سرور دریافت نشد.';
    }
  } else if (error instanceof Error) {
    // خطاهای دیگر
    title = 'خطا';
    message = error.message || 'یک خطا رخ داده است.';
  }

  Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonText: 'باشه',
    confirmButtonColor: '#f87171',
  });
};
