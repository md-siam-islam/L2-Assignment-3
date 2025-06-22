import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true , trim : true },
    author: { type: String, required: true },
    genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
  },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
  }, {
  timestamps: true,
})


bookSchema.methods.reduceCopies = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  this.copies -= quantity;

  if (this.copies === 0) {
    this.available = false;
  }

  await this.save();
};


  export const Book = model("Book" , bookSchema)