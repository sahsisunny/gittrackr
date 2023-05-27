interface IFormatDate {
  (dateString: string): string;
}

const FormatDate: IFormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
};

export default FormatDate;
