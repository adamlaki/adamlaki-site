import moment from "moment";

export default (value, locale) => {
  moment.locale(locale);
  const dateObject = moment(value);
  return dateObject.format("LL");
};
