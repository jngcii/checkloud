import React from "react";
import { Dimensions } from "react-native";
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

// 이게 swiper 혹은 scrollView가 돼야 한다.
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
	isMaking,
	addedItem,
	addedItemSgt,
	scrollRef,
	//func
	onSwipe
}) => (
	<Wrapper>
		<SwiperWrapper
			ref={scrollRef}
			onScroll={e => onSwipe(e)}
			scrollEventThrottle={16}
		>
			<PlanBoxNew addedItem={addedItem} addedItemSgt={addedItemSgt} />

			{plans.length > 0 ? (
				plans.map(p => (
					<PlanBox key={p.id} plan={p} isMaking={isMaking} />
				))
			) : (
				<NoPlan />
			)}
		</SwiperWrapper>
	</Wrapper>
);
