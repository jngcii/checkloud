import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";
import PlanBox from "../PlanBox";
import PlanBoxNew from "../PlanBoxNew";
import NoPlan from "../NoPlan";
import PlanBoxPreview from "../PlanBoxPreview";

const { width, height } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	height: ${height - getBottomSpace() - 120};
	justify-content: flex-end;
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

const ControlBar = styled.View`
	width: 50%;
	height: 30px;
	align-self: center;
	bottom: 0;
	position: absolute;
`;

const PreviewWrapper = styled.View`
	width: 100%;
	height: 230px;
	position: absolute;
`;
const PreviewHeader = styled.View`
	width: 100%;
	height: 20px;
	align-items: center;
	justify-content: center;
	padding: 0 30px;
`;
const PreviewText = styled.Text`
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.greyColor};
`;
const PreviewBody = styled.View`
	flex: 1;
	width: 100%;
	padding: 0 20px;
	padding-bottom: 15px;
`;
const ShadowLeft = styled.View`
	left: 0;
	width: 25px;
	height: 100%;
	position: absolute;
	background-color: ${props => props.theme.bgColor};
	box-shadow: 13px 0 8px rgba(230, 230, 230, 0.5);
`;
const ShadowRight = styled.View`
	right: 0;
	width: 25px;
	height: 100%;
	position: absolute;
	background-color: ${props => props.theme.bgColor};
	box-shadow: -13px 0 8px rgba(230, 230, 230, 0.5);
`;

const PreviewContainer = styled.ScrollView.attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false
})`
	width: 100%;
	height: 100%;
`;

const Preview = ({ plans }) => (
	<PreviewWrapper>
		<PreviewHeader>
			<PreviewText>Preview</PreviewText>
		</PreviewHeader>

		<PreviewBody>
			<PreviewContainer
				contentOffset={{ x: (width - 180) / 2 }}
				contentInset={{
					left: (width - 180) / 2,
					right: (width - 180) / 2
				}}
				snapToInterval={140}
				decelerationRate={"fast"}
				snapToAlignment={"center"}
			>
				<PlanBoxPreview />

				{plans.length > 0 ? (
					plans.map(p => <PlanBoxPreview key={p.id} />)
				) : (
					<PlanBoxPreview />
				)}
			</PreviewContainer>

			<ShadowLeft />
			<ShadowRight />
		</PreviewBody>
	</PreviewWrapper>
);

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
		<Preview plans={plans} />

		<Animated.View
			style={[
				styles.swiperStyle,
				{ transform: [{ translateY: swiperY.location.y }] }
			]}
		>
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
						/>
					))
				) : (
					<NoPlan swiperY={swiperY} panResponder={panResponder} />
				)}
			</SwiperWrapper>

			<ControlBar {...panResponder.panHandlers} />
		</Animated.View>
	</Wrapper>
);

const styles = StyleSheet.create({
	swiperStyle: {
		width: "100%",
		height: "100%"
	}
});
