import { get } from "axios";

export const fetchData = async (req, res) => {
	try {
		const response = await get(process.env.URL);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).send("Error getting data: " + error.message);
	}
};

// Endpoint GET that returns status 200
export const getWaitList = (req, res) => {
	try {
		res.status(200).send("OK");
	} catch (error) {
		res.status(500).send("Error: " + error.message);
	}
};

// Endpoint POST that receives a JSON array and returns the total number of elements
export const postWaitList = (req, res) => {
	try {
		const list = req.body;
		res.status(200).json({ total: list.length });
	} catch (error) {
		res.status(500).send("Error: " + error.message);
	}
};

// Endpoint POST que ordena a fila de espera com base em critérios específicos e adiciona 'previsao_consumo'
export const postSortedWaitList = (req, res) => {
	try {
		const list = req.body;
		const paymentConditionWeight = { DIN: 5, 30: 4, R60: 3, 90: 2, 120: 1 };

		const sortedList = list.sort((a, b) => {
			const countryA = a.pais === "PORT" ? 1 : 0;
			const countryB = b.pais === "PORT" ? 1 : 0;
			const paymentConditionA =
				paymentConditionWeight[a.condicao_pagamento] || 0;
			const paymentConditionB =
				paymentConditionWeight[b.condicao_pagamento] || 0;
			const scoreA =
				a.quantidade * 0.5 + paymentConditionA * 0.3 + countryA * 0.2;
			const scoreB =
				b.quantidade * 0.5 + paymentConditionB * 0.3 + countryB * 0.2;

			return scoreB - scoreA;
		});

		sortedList.forEach(
			(item) => (item.consumptionForecast = item.quantidade * 5)
		);

		res.status(200).json(sortedList);
	} catch (error) {
		res.status(500).send(`Error processing request: ${error.message}`);
	}
};
