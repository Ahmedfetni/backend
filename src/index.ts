import express, { Request, Response} from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan"
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./database_connection.ts";

//Middle ware configuration 

const __filename= fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename) ;

dotenv.config();

const app = express();

app.use(express.json());

app.use(helmet()); // for http header secularization 

app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(morgan("common")); // a http request logger middleware 

app.use(bodyParser.json({limit:"30mb", })); //parse incoming bodies in middleware before your handlers, available u,der the req.body property

app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors()); //corse origin policies 

app.use("/assets",express.static(path.join(__dirname,"public/assets"))); //where we keep our assets like images 

/* File Storage */

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void // a function with or without an error and file name as a string 

const storage =  multer.diskStorage({
    destination: (
        req:Request,
        file: Express.Multer.File,
        cb:DestinationCallback):void=>{
                cb(null, "public/assets");
    },
    filename:(
        req: Request, 
        file: Express.Multer.File, 
        cb: FileNameCallback
    ): void => {
        cb(null,file.originalname); // in this case will use the original file name 
    }
});

const upload  = multer({storage})

/* Routes with files */

//app.post("",upload.single("picture"), register)
app.post("/auth/register",(req,res)=>{

});


//connection to the database and running the server 
connectDB(app)


