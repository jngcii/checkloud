import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import styled from "styled-components";
import PlanBox from "../PlanBox";
import PlanBoxNew from "../PlanBoxNew";
import NoPlan from "../NoPlan";

const { height } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	height: ${height - getBottomSpace() - 120};
	position: absolute;
`;

const SwiperWrapper = styled.ScrollView.attrs({
	horizontal: true,
	pagingEnabled: true,
	showsHorizontalScrollIndicator: false
})`
	width: 100%;
	height: 100%;
	flex-direction: row;
`;

export default ({
	plans,
	isEditing,
	addedItem,
	addedItemSgt,
	itemsVisible,
	pageIndex,
	swipeRef,
	scrollEnabled,
	//animation
	swiperY,
	panResponder,
	//func
	onSwipe
}) => (
	<Wrapper>
		<SwiperWrapper
			ref={swipeRef}
			onScroll={e => onSwipe(e)}
			scrollEventThrottle={16}
			scrollEnabled={scrollEnabled.value}
		>
			<PlanBoxNew
				swipeRef={swipeRef}
				addedItem={addedItem}
				addedItemSgt={addedItemSgt}
				itemsVisible={itemsVisible}
				scrollEnabled={scrollEnabled}
				swiperY={swiperY}
				panResponder={panResponder}
			/>

			{plans.length > 0 ? (
				plans.map(p => (
					<PlanBox
						key={p.id}
						plan={p}
						isEditing={isEditing}
						itemsVisible={itemsVisible}
						scrollEnabled={scrollEnabled}
						pageIndex={pageIndex}
						swiperY={swiperY}
						panResponder={panResponder}
					/>
				))
			) : (
				<NoPlan swiperY={swiperY} panResponder={panResponder} />
			)}
		</SwiperWrapper>
	</Wrapper>
);
