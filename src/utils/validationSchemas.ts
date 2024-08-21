import * as yup from "yup";

// Regular expression to match exactly 11 digits
const phoneNumberSchema = yup.string()
  .matches(/^\d{11}$/, "شماره موبایل باید 11 رقم باشد")
  .required("شماره موبایل الزامی است");

// Regular expression to match Persian characters
const persianUsernameSchema = yup.string()
  .matches(/^[\u0600-\u06FF\s]+$/, "نام کاربری باید حتما فارسی باشد")
  .required("نام کاربری الزامی است");

// Password schema with a minimum length of 6 characters
const passwordSchema = yup.string()
  .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
  .required("رمز عبور الزامی است");

export const loginSchema = yup.object().shape({
  phone_number: phoneNumberSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object().shape({
  full_name: persianUsernameSchema,
  phone_number: phoneNumberSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = yup.object().shape({
  phone_number: phoneNumberSchema,
  newPassword: passwordSchema,
});

export const profileSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام و نام خانوادگی باید فارسی باشد")
    .required("نام و نام خانوادگی الزامی است"),
  nationalId: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید عدد و 10 رقم باشد")
    .required("کد ملی الزامی است"),
  phone_number: yup
    .string()
    .matches(/^\d{11}$/, "شماره تماس باید 11 رقم باشد")
    .required("شماره تماس الزامی است"),
  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  jobTitle: yup.string().required("سمت شغلی الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
  profileImage: yup.mixed().notRequired(), // Adjust for file upload
});
