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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const adminusers_routes_1 = __importDefault(require("./routes/adminusers.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const purchase_routes_1 = __importDefault(require("./routes/purchase.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
});
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            yield sequelize.sync();
            console.log("Database connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
testDatabaseConnection();
// i18next configuration
i18next_1.default.use(i18next_fs_backend_1.default).init({
    lng: "fr",
    fallbackLng: "en",
    preload: ["en", "fr"],
    backend: {
        loadPath: "./src/locales/{{lng}}.json",
    },
}, (err, t) => {
    if (err)
        return console.error("Something went wrong loading", err);
    console.log(i18next_1.default.t("welcome"));
});
const setLanguageMiddleware = (req, res, next) => {
    const lang = req.query.lang || "en";
    i18next_1.default
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
app.use("/bookify/admin", adminusers_routes_1.default);
app.use("/bookify/users", user_routes_1.default);
app.use("/bookify/books", book_routes_1.default);
app.use("/bookify/purchase", auth_1.verifyAccess, purchase_routes_1.default);
app.use("/bookify/wishlist", auth_1.verifyAccess, wishlist_routes_1.default);
app.use("/bookify/cart", auth_1.verifyAccess, cart_routes_1.default);
app.listen(PORT, () => {
    console.log(`Connected to server at : ${PORT}`);
});
