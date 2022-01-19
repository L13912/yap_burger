import { ReactNode } from 'react';

export type TCard = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  guid?: string;
};

export type TIngredients = Array<TCard>;

export type TConstructorIngredients = {
  buns: ReadonlyArray<TCard>;
  toppings: ReadonlyArray<TCard>;
};

export type TConstCard = {
  card: TCard;
  moveCard?: (dragIndex: number, index: number) => void;
  type: string;
  index: number;
};

export type TIngredientCard = {
  card: TCard;
};
export type TIngredientDetails = {
  card?: TCard | undefined;
};

export type TModal = {
  children?: ReactNode;
  close: () => void;
  title?: string;
};

export type TModalOverlay = Omit<TModal, 'title'>;

export type TProtectedRoute = {
  children: ReactNode;
  rest?: string;
  path: string;
};

export type TUser = {
  readonly id: number;
  readonly password: string;
  readonly email: string;
  readonly name: string;
};

export type THistory = {
  replace: (path: string) => void;
  location: {
    state: {
      from: string;
    };
  };
};
