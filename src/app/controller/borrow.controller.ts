
import express from 'express';
import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';
import { IBook } from '../interface/book.interface';


export const borrowRouter = express.Router()



borrowRouter.post("/", async (req: Request, res: Response) => {

    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const foundBook = await Book.findById(bookId) as IBook;

        await foundBook.reduceCopies(quantity);

        const newBorrow = await Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: newBorrow,
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }

})


borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: '$quantity' },
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                }
            },
            {
                $unwind: "$bookInfo"
            },

            {
                $project: {
                    _id: 0,

                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                     totalQuantity: 1
                }
            }


        ])

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrow summary',
        });
    }
})

