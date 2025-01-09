/**
 * Formats a date string into Indonesian date format (DD MMMM YYYY)
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string in Indonesian format
 */
export const formatToIndonesianDate = (dateString: string): string => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
