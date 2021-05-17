type ImageType = {
  id: string;
  name?: string;
  count: number;
  price?: number;
  category: number;
  date: Date;
  uri: string;
};

type ListType = {
  id: string;
  name: string;
  count: number;
  price?: number;
  category: number;
  date: Date;
  uri?: string;
};

export type Item = ImageType | ListType;
