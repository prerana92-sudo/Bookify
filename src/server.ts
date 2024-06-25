import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { Sequelize } from "sequelize";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { verifyAccess } from "./middlewares/auth";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

import adminUserRoutes from "./routes/adminusers.routes";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import purchaseRoutes from "./routes/purchase.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import cartRoutes from "./routes/cart.routes";


const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 3306,
  dialect: "mysql",
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

// i18next configuration
i18next.use(Backend).init(
  {
    lng: "fr",
    fallbackLng: "en",
    preload: ["en", "fr"],
    backend: {
      loadPath: "./src/locales/{{lng}}.json",
    },
  },
  (err, t) => {
    if (err) return console.error("Something went wrong loading", err);
    console.log(i18next.t("welcome"));
  }
);

const setLanguageMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const lang: string = (req.query.lang as string) || "en";

  i18next
    .changeLanguage(lang)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error("Error changing language:", error);
      res.status(500).send("Error changing language");
    });
};

app.use(setLanguageMiddleware);

app.use("/bookify/admin", adminUserRoutes)
app.use("/bookify/users", userRoutes);
app.use("/bookify/books", bookRoutes);
app.use("/bookify/purchase", verifyAccess, purchaseRoutes);
app.use("/bookify/wishlist", verifyAccess, wishlistRoutes);
app.use("/bookify/cart", verifyAccess, cartRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server at : ${PORT}`);
});
