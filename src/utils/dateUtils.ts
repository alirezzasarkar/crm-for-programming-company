import moment from 'jalali-moment';

// تابع برای محاسبه تاریخ شروع هفته
export const getStartOfWeek = (date: moment.Moment) => {
  // روزهای هفته شمسی: شنبه (0) تا جمعه (6)
  const dayOfWeek = date.day(); // 0: شنبه, 1: یکشنبه, ..., 6: جمعه
  
  // تصحیح یک روز اضافه
  const startOfWeek = date.clone().subtract(dayOfWeek + 1, 'days'); // برگشت به روز شنبه
  return startOfWeek;
};

// تابع برای گرفتن تاریخ‌های هفته
export const getWeekDates = (startDate: moment.Moment) => {
  const daysOfWeek = [
    "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"
  ];

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const day = startDate.clone().add(i, 'days');
    
    // فرمت تاریخ به صورت yyyy/mm/dd
    const formattedDate = day.format('jYYYY/jMM/jDD');
    
    weekDates.push({
      name: daysOfWeek[i],
      date: formattedDate
    });
  }
  return weekDates;
};

// استفاده از تابع‌ها
const today = moment(); // تاریخ امروز
const startOfWeek = getStartOfWeek(today); // شروع هفته
const weekDates = getWeekDates(startOfWeek); // تاریخ‌های هفته

