import express from 'express';
import cors from 'cors';
import pino from "pino-http";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

const app = express(); // app - web-server

// app.set("json spaces", 8);

// app.use((req, res, next)=> {
//   console.log("First middleware");
//   next();
// });

// app.use((req, res, next)=> {
//   console.log("Second middleware");
//   next();
// });

// const cors = (options = {}) => {
//   const middleware = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//     );
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-Requested-With,content-type',
//     );
//     next();
//   };

//   return middleware;
// };

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   next();
// });

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(cors());
const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss",
      ignore: "pid,hostname",
      message: "{req.method} {req.url} {req.statusCode} - {responseTime}",
      hideObject: true
    }
  }
});
app.use(logger);
app.use(express.json());

app.get('/', (request, response) => {
  console.log(request.method);
  console.log(request.url);

  response.send('<h1>Home page</h1>');
});

app.get('/contacts', (req, res) => {
  // запит до бази даних за контактами
  const databaseResponse = null;
  // res.json(databaseResponse);
  // res.send(databaseResponse);
  res.json({
    message: 'Get all contacts',
  });
  // res.send({
  //   message: "Get all contacts"
  // });
});

app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Get contact with id=${id}`,
  });
});
const productsPath = join("src", "products2.json");

app.get("/products", async (req, res)=> {
  const data = await readFile(productsPath, "utf-8"); // throw new Error("Cannot find file")
  const products = JSON.parse(data);
  res.json(products);
})

app.use((req, res)=> {
  res.status(404).json({
    message: `${req.method} ${req.url} not found`
  })
})

app.use((error, req, res, next)=> {
  res.status(500).json({
    message: error.message
  })
})

app.listen(3000, () => console.log('Server running successfully 3000 port'));
