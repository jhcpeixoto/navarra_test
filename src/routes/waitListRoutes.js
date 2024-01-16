import express from "express";
import {
	fetchData,
	getWaitList,
	postSortedWaitList,
	postWaitList,
} from "../controllers/waitListController";

const router = express.Router();

router.get("/fetchData", fetchData);

// Rota para o endpoint GET
router.get("/", getWaitList);

// Rota para o endpoint POST que recebe um array JSON
router.post("/postWaitList", postWaitList);

// Rota para o endpoint POST que ordena a lista
router.post("/postSortedWaitList", postSortedWaitList);

export default router;
