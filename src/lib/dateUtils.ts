export const toBackendDate = (dateStr: string): string => {
  if (!dateStr) return "";
  // Check if date is in yyyy-MM-dd format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}-${mm}-${yyyy}`;
  }
  return dateStr;
};

export const toFrontendDate = (dateStr: string): string => {
  if (!dateStr) return "";
  // Check if date is in dd-MM-yyyy format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [dd, mm, yyyy] = dateStr.split("-");
    return `${yyyy}-${mm}-${dd}`;
  }
  return dateStr;
};

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  let dd = "";
  let mm = "";
  let yyyy = "";

  // If in dd-MM-yyyy format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    [dd, mm, yyyy] = dateStr.split("-");
  }
  // If in yyyy-MM-dd format
  else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    [yyyy, mm, dd] = dateStr.split("-");
  } else {
    return dateStr;
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = parseInt(mm, 10) - 1;
  const monthName = months[monthIndex] || mm;
  return `${dd} ${monthName} ${yyyy}`;
};
