const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FormatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};

export default FormatDate;
