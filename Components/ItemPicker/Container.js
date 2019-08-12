import React, { useEffect } from "react";
import useBoolean from "../../Hooks/useBoolean";
import ShapeAnimation from "../../Animations/shapeAnimation";
import Presenter from "./Presenter";

export default () => {
	const itemsVisible = useBoolean(false);

	const pickerShape = ShapeAnimation(0, 60);

	const onChangeShape = () => {
		itemsVisible.setValue(!itemsVisible.value);
	};

	useEffect(() => {
		if (itemsVisible.value) {
			if (pickerShape.height._value != 320)
				pickerShape.changeShape({ toHeight: 320 });
		} else {
			if (pickerShape.height._value != 60)
				pickerShape.changeShape({ toHeight: 60 });
		}
	}, [itemsVisible]);

	return (
		<Presenter
			itemsVisible={itemsVisible}
			pickerShape={pickerShape}
			onChangeShape={onChangeShape}
		/>
	);
};
