import {ReactNode} from "react";

export type TCard = {
  "_id": string;
  "name": string;
  "type": string;
  "proteins": number;
  "fat": number;
  "carbohydrates": number;
  "calories": number;
  "price": number;
  "image": string;
  "image_mobile": string;
  "image_large": string;
  "__v": number;
  "guid"?: string
};

export type TIngredients = Array<TCard>;

export type TConstructorIngredients = {
  buns: ReadonlyArray<TCard>,
  toppings: ReadonlyArray<TCard>
};

export type TConstCard = {
  card: TCard,
  /*не обязательная, тк булки не перетаскиваются*/
  moveCard?: any,
/*  moveCard?:  { func: (dragIndex: number, index: number) => {} },*/
  type: string,
  index: number
}

export type TIngredientCard = {
  card: TCard/*,
  image?: string,
  price: number,
  name: string*/
}
export type TIngredientDetails = {
  card?: TCard | undefined/*,
  image?: string,
  price: number,
  name: string*/
}

export type TModal = {
  children?: ReactNode,
  close: any,
  title?: string
}



export type TUser = {
  readonly id: number;
  readonly password: string;
  readonly email: string;
  readonly name: string;
};

export type TRawUser = Omit<TUser, 'id'> & { _id: number };

export type TPrize = {
  readonly year: string;
  readonly category: string;
  readonly share: string;
  readonly motivation: string;
  readonly affiliations: ReadonlyArray<TAffiliations>;
};

export type TAffiliations = {
  readonly name: string;
  readonly city: string;
  readonly country: string;
};

export type TCountry = {
  readonly name: string;
  readonly code: string;
};

export type TLaureate = {
  readonly id: string;
  readonly firstname: string;
  readonly surname: string;
  readonly born: string;
  readonly died: string;
  readonly bornCountry: string;
  readonly bornCountryCode: string;
  readonly bornCity: string;
  readonly diedCountry: string;
  readonly diedCountryCode: string;
  readonly diedCity: string;
  readonly gender: string;
  readonly prizes: ReadonlyArray<TPrize>;
};
