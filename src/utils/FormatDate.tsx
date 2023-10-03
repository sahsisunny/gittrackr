const FormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString(undefined, options);

  return formattedDate;
};

export default FormatDate;
