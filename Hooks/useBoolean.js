import { useState } from "react";

export default defaultValue => {
	const [value, setValue] = useState(defaultValue);

	return { value, setValue };
};
