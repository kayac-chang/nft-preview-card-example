export interface Asset {
  tokenID: string;
  address: string;
  image: string;
  name: string;
  description: string;
  creator: Creator;
}

export interface Creator {
  image: string;
  name: string;
}
