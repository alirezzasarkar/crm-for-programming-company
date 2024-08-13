import moment from 'jalali-moment';

// توابع برای کار با تاریخ شمسی

export const getWeekDates = (startDate: moment.Moment) => {
  const daysOfWeek = [
    "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", 
  ];

  const weekDates = [];
  for (let i = 0; i < 6; i++) {
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

export const getStartOfWeek = (date: moment.Moment) => {
  const startOfWeek = date.clone().startOf('week').add(1, 'day'); // تنظیم تاریخ شروع هفته به روز شنبه
  return startOfWeek;
};
