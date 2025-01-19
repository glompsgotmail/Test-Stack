import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // For password hashing
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

//template for how a registration form should look
interface RegisterRequest extends Request {
    body: {
        email: string;
        password: string;
        username: string;
    }
}
//template for throwing a registration error
interface ValidationError extends Response{
    field:string;
    message:string;
}


app.post('/register', async (req: RegisterRequest, res: Response) => {
    const { email, password, username } = req.body;
    if(req.body.password.length >=0 && req.body.username.length >=0){
        try{
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: username, // Assuming "name" corresponds to the "username"
            },
        });
        res.status(201).json({ message: 'Registration Successful', user: newUser });
        console.log("success?")
        }catch( error) {
          if(error instanceof Error)
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }


    }else{
      console.log("error")
        res.status(400).send("Registration Error")
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
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