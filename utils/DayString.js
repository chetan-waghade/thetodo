//day name
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

//date
const date = new Date();

console.log(`${getDayName(date, 'en-US')}`);

export const dayAndDate = `${getDayName(date, 'en-US')}`;
