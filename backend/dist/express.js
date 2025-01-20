"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const client = new pg_1.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
});
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));
app.get('/', (req, res) => {
    res.status(200).send('Backend is running. Welcome to the API!');
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    console.log("recieved");
    if (req.body.password.length >= 0 && req.body.username.length >= 0) {
        try {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: username, // Assuming "name" corresponds to the "username"
                },
            });
            res.status(201).json({ message: 'Registration Successful', user: newUser });
            console.log("success?");
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal Server Error', error: error.message });
                console.log(error);
            }
        }
    }
    else {
        console.log("error");
        res.status(400).send("Registration Error");
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
/*
app.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user); // Respond with the created user
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
    return;
  }
});


*/ 
