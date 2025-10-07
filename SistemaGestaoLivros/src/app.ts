import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swaggerDocument';


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => res.send({ healthy: true }));


export default app;