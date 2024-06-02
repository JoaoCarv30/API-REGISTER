import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/:id', async (req, res) => {
    try {
      const user = await prisma.user.update({
        where : {
            id: req.params.id
        },
        data: {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        }
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.delete('/:id', async (req, res) => {
    try {
      const user = await prisma.user.delete({
        where : {
            id: req.params.id
        }
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
