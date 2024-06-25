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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPurchaseDataController = exports.fetchUserPurchaseHistoryController = exports.addPurchaseController = void 0;
const purchase_service_1 = require("../services/purchase.service");
const addPurchaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseData = req.body;
        const lang = req.userLang ? req.userLang : "en";
        const result = yield (0, purchase_service_1.addPurchaseData)(purchaseData, req.jwtData.userName, lang);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while adding purchase data: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while adding purchase data",
        });
    }
});
exports.addPurchaseController = addPurchaseController;
const fetchUserPurchaseHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, purchase_service_1.fetchUserPurchaseHistory)(req.jwtData.userName);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while fetching purchase data: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while fetching purchase data",
        });
    }
});
exports.fetchUserPurchaseHistoryController = fetchUserPurchaseHistoryController;
const searchPurchaseDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchString } = req.body;
        const userName = req.jwtData.userName;
        const result = yield (0, purchase_service_1.searchPurchaseData)(userName, searchString);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while searching purchase data: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while searching purchase data",
        });
    }
});
exports.searchPurchaseDataController = searchPurchaseDataController;
