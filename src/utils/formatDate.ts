/**
 * @name formatDate
 * @description Function to format dates
 */

export const formatDate = (date: string, addTime: boolean): string => {
  // Options for date formatting
  if (addTime) {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "numeric",
      second: "numeric",
    };

    // Format date
    const formattedDate: string = new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, "-")
      .replace(",", " ");

    return formattedDate;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };

    // Format date
    const formattedDate: string = new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, "-")
      .replace(",", " ");

    return formattedDate;
  }
};
