
import express from "express"
import { Request, Response , Router } from "express"
import app from "../../app"
import { Book } from "../models/book.model"


export const bookRouter = express.Router()

bookRouter.post("/books" , async(req : Request , res: Response) => {
try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
});
   


bookRouter.get('/books', async (req: Request, res: Response) => {

    try {

    const {filter, sortBy = "createdAt" , sort = "desc" , limit = '10' } = req.query;

    const query : any = {}

        if(filter){
            query.genre = filter
        }

        const sortOptions: any = {};
        sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;

        const books = await Book.find(query)
      .sort(sortOptions)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });


    } catch (error) {
        res.status(400).json({
      message: 'Failed to get books',
      success: false,
      error,
    });
    }
});


bookRouter.get('/books/:bookId' , async(req:Request , res: Response) => {
    const bookid = req.params.bookId

    const book = await Book.findById(bookid)

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: book
    })
})

bookRouter.patch("/books/:bookId" , async(req:Request , res:Response) => {

        const bookid = req.params.bookId
        const updatedBody = req.body


        const updatedBook = await Book.findByIdAndUpdate(bookid , updatedBody , {new : true})

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
})


bookRouter.delete("/books/:bookId" , async(req:Request , res: Response) => {
    const bookid = req.params.bookId

    const delectBook = await Book.findByIdAndDelete(bookid)

     res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data : null
    })
})


