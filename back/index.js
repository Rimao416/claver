const express = require("express"); //Faire appel au Package d'expressJs
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const projetRouter = require("./routes/projetRoutes");
const departementRouter = require("./routes/departementRoutes");
const posteRouter = require("./routes/posteRoute");
const congeRouter = require("./routes/congeRoutes");
const cookieParser = require("cookie-parser");
const { mongo } = require("mongoose");
const cors = require("cors");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// 1) MIDDLEWARE

// Définir une sécurité pour nos entêtes HTTP
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);
// data sanitization against NOSQL Query Injection
app.use(mongoSanitize());
// data sanitization against XSS
app.use(xss());
// Prevent parameter Pollution
app.use(hpp());

app.use(express.static(`${__dirname}/public`));

// LIMITS REQUEST FROM SAME API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request From This Ip, please try again",
});
app.use("/api", limiter);

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

// 2) ROUTE HANDLERS

// 3) ROUTES

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projets", projetRouter);
app.use("/api/v1/conges", congeRouter);
app.use("/api/v1/departements", departementRouter);
app.use("/api/v1/postes", posteRouter);

// Handle Errors

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) SERVER

module.exports = app;
