import dayjs from 'dayjs';
import 'dayjs/locale/ja';

/** Change -> ¥999,999 */
export const Formatter = () => {
  const price = (money: number | undefined): string | undefined => {
    if (money) {
      return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(money);
    } else {
      return undefined;
    }
  };

  /** Change -> YYYY-MM-DD */
  const dateHyphen = (date: Date): string => {
    return dayjs(date).locale('ja').format('YYYY-MM-DD');
  };
  /** Change -> YYYY/MM/DD */
  const dateSlash = (date: Date): string => {
    return dayjs(date).locale('ja').format('YYYY/MM/DD');
  };

  const getId = (array: any[] | undefined): string => {
    if (Array.isArray(array)) {
      return array.length > 0
        ? (Math.max(...array.map((_) => Number(_.id))) + 1).toString()
        : '0';
    } else {
      return '0';
    }
  };

  return { price, dateHyphen, dateSlash, getId };
};
