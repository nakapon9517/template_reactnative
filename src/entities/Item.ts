import { ImageSourcePropType } from 'react-native';

export type Item = {
  id: string;
  name: string;
  count: number;
  price: number;
  category: number;
  date: Date;
  uri?: ImageSourcePropType;
};
