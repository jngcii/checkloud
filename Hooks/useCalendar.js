import { useState } from "react";

export default defaultValue => {
	const [defaultDay, setDefaultDay] = useState(defaultValue);

	const getCalendar = () => {
		const firstDay = new Date(
			defaultDay.getFullYear(),
			defaultDay.getMonth(),
			1
		);

		const lastDay = new Date(
			defaultDay.getFullYear(),
			defaultDay.getMonth() + 1,
			0
		);

		const arr = [];
		const calendar = [];
		let year = firstDay.getFullYear();
		let month = firstDay.getMonth();
		let day = firstDay.getDay();

		for (let i = 1; i <= lastDay.getDate() + (6 - lastDay.getDay()); i++) {
			if (day > 6) day = 0;

			if (i <= lastDay.getDate()) arr.push({ year, month, date: i, day });
			else arr.push({});

			day += 1;

			console.log(
				"arr:",
				arr,
				"lastDay:",
				lastDay.getDate(),
				arr.length,
				lastDay.getDate() + 6 - lastDay.getDay()
			);

			if (arr.length === lastDay.getDate() + (6 - lastDay.getDay())) {
				const arr1 = [];
				for (let j = 0; j < firstDay.getDay(); j++) {
					arr1.push({});
					if (arr1.length === firstDay.getDay()) {
						for (let k = 0; k < 7 - firstDay.getDay(); k++) {
							arr1.push(arr.shift());
						}
					}
					console.log("arr1", arr1);
					if (arr1.length === 7) {
						calendar.push(arr1);
					}
				}
			}

			console.log("b", calendar);

			if (calendar.length === 1) {
				while (arr.length !== 0) {
					const arr1 = [];

					for (let j = 0; j < 7; j++) {
						arr1.push(arr.shift());

						if (arr1.length === 7) {
							calendar.push(arr1);
						}

						console.log("c", calendar);

						if (arr.length == 0) return calendar;
					}
				}
			}
		}
	};

	return { defaultDay, setDefaultDay, getCalendar };
};
