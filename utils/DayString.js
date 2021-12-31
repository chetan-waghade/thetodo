//day name
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

//date
const date = new Date();

export const dayAndDate = `${getDayName(date, 'en-US')}`;
