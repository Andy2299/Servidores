import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees.js';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
