export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-gb');
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-gb', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: Date | undefined | null) => {
  if (!date) return '';
  return formatDate(date) + ' ' + formatTime(date);
};
