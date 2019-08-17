import React, { useRef, useEffect } from "react";
import Presenter from "./Presenter";

export default ({ item, stack, swiping, onRemoveItem }) => {
	const swipeRef = useRef(null);

	useEffect(() => {
		if (swiping.value != (item.id && null)) swipeRef.current.recenter();
	}, [swiping]);

	return (
		<Presenter
			// props
			item={item}
			stack={stack}
			swiping={swiping}
			// state
			swipeRef={swipeRef}
			// func
			onRemoveItem={onRemoveItem}
		/>
	);
};
