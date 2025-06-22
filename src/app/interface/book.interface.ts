export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  reduceCopies(quantity: number): Promise<void>;
}