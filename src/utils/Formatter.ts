import dayjs from 'dayjs';
import 'dayjs/locale/ja';

/** Change -> ¥999,999 */
export const price = (money: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(money);
};

/** Change -> YYYY-MM-DD */
export const dateHyphen = (date: Date): string => {
  return dayjs(date).locale('ja').format('YYYY-MM-DD');
};
/** Change -> YYYY/MM/DD */
export const dateSlash = (date: Date): string => {
  return dayjs(date).locale('ja').format('YYYY/MM/DD');
};
