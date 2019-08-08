import { useState } from "react";

export default defaultArray => {
	const [array, setArray] = useState(defaultArray);

	const count = array.length;

	const add = i => {
		const lengthBefore = array.length;
		array.push(i);

		setArray([...array]);

		const lengthAfter = array.length;

		if (lengthBefore !== lengthAfter) return true;
		else return false;
	};

	const remove = i => {
		const idx = array.indexOf(i);
		if (idx != -1) {
			array.splice(idx, 1);

			setArray([...array]);

			return true;
		}
		return false;
	};

	const removeBehindAll = i => {
		array.splice(array.indexOf(i), array.length - array.indexOf(i));

		setArray([...array]);
	};

	const removeLast = () => {
		return array.pop();
	};

	const removeAll = () => {
		setArray([]);
	};

	const replace = ({ i, n }) => {
		const arr = array;

		const idx = array.indexOf(i);

		if (idx != -1) {
			arr[idx] = n;
			setArray([...arr]);

			return true;
		}

		return false;
	};

	return {
		array,
		count,
		add,
		remove,
		removeBehindAll,
		removeLast,
		removeAll,
		replace,
		setArray
	};
};
