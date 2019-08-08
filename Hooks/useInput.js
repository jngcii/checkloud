import { useState } from "react";

export default defaultValue => {
	const [value, setValue] = useState(defaultValue);

	const onChange = e => {
		setValue(e);
	};

	return { value, onChange };
};
