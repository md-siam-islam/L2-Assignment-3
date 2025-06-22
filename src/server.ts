import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server : Server

const PORT = 5000


async function main () {
   
    try{
        await mongoose.connect('mongodb+srv://Level2B5A3:7w4nI0a1Ou91UQEC@cluster0.5b559.mongodb.net/Library-Management?retryWrites=true&w=majority&appName=Cluster0')
        server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
    }catch (error){
        console.log(error);
    }
}

main()