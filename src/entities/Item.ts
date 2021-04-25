import { ImageSourcePropType } from 'react-native';

export type Item = {
  id: string;
  name: string;
  count: number;
  money: number;
  category: number;
  date: Date;
  uri?: ImageSourcePropType;
};
