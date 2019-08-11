import React, { useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import { useQuery } from "react-apollo-hooks";
import { GET_ITEMS } from "../../API/queries/itemQueries";
import useObject from "../../Hooks/useObject";
import shapeAnimation from "../../Animations/shapeAnimation";
import Presenter from "./Presenter";

const { width, height } = Dimensions.get("window");

export default ({ screen, itemShape, floor = 0, itemId = "a" }) => {
	const {
		data: { items },
		loading: loadingItems
	} = useQuery(GET_ITEMS);

	const item = items.filter(i => i.id == itemId)[0];

	const childItems = items.filter(i => i.parentId == itemId);

	const stack = useObject(null);

	const stackShape = shapeAnimation();

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,

		onPanResponderMove: (_, gestureState) => {
			if (
				height -
					getBottomSpace() -
					getStatusBarHeight() -
					gestureState.dy >
				100
			) {
				itemShape.height.setValue(
					height -
						getBottomSpace() -
						getStatusBarHeight() -
						gestureState.dy
				);

				if (itemShape.height._value <= width) {
					itemShape.width.setValue(
						height -
							getBottomSpace() -
							getStatusBarHeight() -
							gestureState.dy
					);
				}
			}
		},

		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dy < 200) {
				itemShape.changeShape({
					toHeight: height - getBottomSpace() - getStatusBarHeight(),
					toWidth: width
				});
			} else {
				screen.setValue("plan");
			}
		}
	});

	useEffect(() => {
		if (stack.value) {
			if (stackShape.width._value === 0)
				stackShape.changeShape({ toWidth: 1, toHeight: 1 });
		}

		if (!stack.value) {
			if (stackShape.width._value === 1)
				stackShape.changeShape({ toWidth: 0, toHeight: 0 });
		}
	}, [stack]);

	if (loadingItems) return null;

	return (
		<Presenter
			// props
			floor={floor}
			stack={stack}
			//state
			item={item}
			childItems={childItems}
			panResponder={panResponder}
			// func
			stackShape={stackShape}
		/>
	);
};
