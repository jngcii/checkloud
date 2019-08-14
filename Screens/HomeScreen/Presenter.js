import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components";
import PlanSwiper from "../../Components/PlanSwiper";
import ItemPicker from "../../Components/ItemPicker";
import ItemScreen from "../ItemScreen";
import HistoryScreen from "../HistoryScreen";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	flex: 1;
	align-items: center;
	justify-content: flex-end;
`;
const WrapperBottom = styled.SafeAreaView`
	width: 100%;
	justify-content: flex-end;
`;

const PreviewWrapper = styled.View`
	width: 100%;
	height: 230px;
`;
const PreviewHeader = styled.View`
	width: 100%;
	height: 30px;
`;
const PreviewBody = styled.View`
	flex: 1;
	width: 100%;
`;

const PaginationWrapper = styled.View`
	width: 100%;
	height: 20px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const Dot = styled.View`
	width: ${props => (props.isNow ? 12 : 8)};
	height: ${props => (props.isNow ? 12 : 8)};
	border-radius: ${props => (props.isNow ? 6 : 4)};
	margin: 0 5px;
	background-color: ${props =>
		props.isNow ? props.theme.blackColor : props.theme.greyColor};
`;

const Footer = styled.View`
	width: 100%;
	height: 100px;
`;
const PercentBarWrapper = styled.View`
	width: ${width - 200};
	height: 100px;
	padding: 20px 0;
	position: absolute;
	align-self: center;
`;
const PercentBarBtn = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.bgColor};
	${props => props.theme.navShadow};
`;
const PercentInnerContainer = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;
const ProgressBar = styled.View`
	position: absolute;
	align-self: flex-start;
	height: 100%;
	width: ${props => props.width};
	background-color: ${props => props.color};
`;
const GarbageIcon = styled.Image.attrs({
	source: require("../../assets/icons/garbageIcon.png")
})`
	width: 25px;
	height: 25px;
	margin-bottom: 5px;
`;
const PercentBarText = styled.Text`
	font-size: ${props => props.theme.percentBarFontSize};
	font-weight: ${props => props.theme.percentBarFontWeight};
	color: ${props => props.theme.whiteColor};
	text-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
`;
const NavBtn = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.navBtnColor};
	${props => !props.disabled && props.theme.navShadow};
	align-items: center;
	justify-content: center;
`;
const ItemIcon = styled.Image.attrs({
	source: require("../../assets/icons/listIcon.png")
})`
	width: 36px;
	height: 36px;
`;
const HistoryIcon = styled.Image.attrs({
	source: require("../../assets/icons/clockIcon.png")
})`
	width: 36px;
	height: 36px;
`;

const Preview = () => (
	<PreviewWrapper>
		<PreviewHeader />
		<PreviewBody />
	</PreviewWrapper>
);

const Pagination = ({ plans, pageIndex }) => (
	<PaginationWrapper>
		<Dot isNow={pageIndex.value == 0} />
		{plans.length > 0 ? (
			plans.map((_, index) => (
				<Dot key={index} isNow={pageIndex.value == index + 1} />
			))
		) : (
			<Dot isNow={pageIndex.value == 1} />
		)}
	</PaginationWrapper>
);

const PercentBar = ({ plans, pageIndex, onPressPercentBar }) => {
	let plan;
	let p = 1;
	let planColor = "#333";

	const PERCENT_WIDTH = width - 200;

	if (plans.length > 0 && pageIndex.value != 0) {
		plan = plans[pageIndex.value - 1];
		if (plan && plan.itemActs) {
			p =
				plan.itemActs.filter(i => i.isChecked).length /
				plan.itemActs.length;
			planColor = plan.itemActs[0].color;
		}
	}

	return (
		<PercentBarWrapper>
			<PercentBarBtn onPressOut={() => onPressPercentBar(plan.id)}>
				<PercentInnerContainer>
					<ProgressBar width={PERCENT_WIDTH * p} color={planColor} />

					<GarbageIcon style={{ tintColor: "#fff" }} />
					<PercentBarText>체크리스트 종료</PercentBarText>
				</PercentInnerContainer>
			</PercentBarBtn>
		</PercentBarWrapper>
	);
};

const Item = ({ screen, itemShape, onPressItemNav }) => (
	<Animated.View
		style={[
			{ width: itemShape.width, height: itemShape.height },
			styles.navBtnStyle,
			styles.itemStyle,
			screen.value == "item" && { zIndex: 2 }
		]}
	>
		<NavBtn onPressOut={onPressItemNav} disabled={screen.value == "item"}>
			{screen.value == "item" ? (
				<ItemScreen screen={screen} itemShape={itemShape} />
			) : (
				<ItemIcon style={{ tintColor: "#555" }} />
			)}
		</NavBtn>
	</Animated.View>
);

const History = ({ screen, historyShape, onPressHistoryNav }) => (
	<Animated.View
		style={[
			{ width: historyShape.width, height: historyShape.height },
			styles.navBtnStyle,
			styles.historyStyle,
			screen.value == "history" && { zIndex: 2 }
		]}
	>
		<NavBtn
			onPressOut={onPressHistoryNav}
			disabled={screen.value == "history"}
		>
			{screen.value == "history" ? (
				<HistoryScreen screen={screen} historyShape={historyShape} />
			) : (
				<HistoryIcon style={{ tintColor: "#555" }} />
			)}
		</NavBtn>
	</Animated.View>
);

export default ({
	// state
	plans,
	screen,
	isMaking,
	isEditing,
	addedItem,
	addedItemSgt,
	addedItemAct,
	itemsVisible,
	pageIndex,
	swipeRef,
	// animation
	navY,
	pickerY,
	itemShape,
	historyShape,
	// func
	onPressPercentBar,
	onPressItemNav,
	onPressHistoryNav
}) => (
	<React.Fragment>
		<Wrapper screen={screen}>
			{screen.value == "plan" && <Preview />}
			<Pagination plans={plans} pageIndex={pageIndex} />
		</Wrapper>

		<PlanSwiper
			plans={plans}
			isMaking={isMaking}
			isEditing={isEditing}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			itemsVisible={itemsVisible}
			pageIndex={pageIndex}
			swipeRef={swipeRef}
		/>

		<WrapperBottom>
			<Footer>
				<Animated.View
					style={[
						styles.navStyle,
						{ transform: [{ translateY: navY.location.y }] }
					]}
				>
					<PercentBar
						plans={plans}
						pageIndex={pageIndex}
						// func
						onPressPercentBar={onPressPercentBar}
					/>

					<Item
						screen={screen}
						itemShape={itemShape}
						// func
						onPressItemNav={onPressItemNav}
					/>

					<History
						screen={screen}
						historyShape={historyShape}
						// func
						onPressHistoryNav={onPressHistoryNav}
					/>
				</Animated.View>

				<Animated.View
					style={[
						styles.pickerStyle,
						{ transform: [{ translateY: pickerY.location.y }] }
					]}
				>
					<ItemPicker
						itemsVisible={itemsVisible}
						addedItem={addedItem}
					/>
				</Animated.View>
			</Footer>
		</WrapperBottom>
	</React.Fragment>
);

const styles = StyleSheet.create({
	navStyle: {
		width: "100%",
		height: "100%",
		position: "absolute",
		justifyContent: "flex-end"
	},
	pickerStyle: {
		width: "100%",
		height: "100%",
		padding: 20,
		position: "absolute",
		justifyContent: "flex-end"
	},
	navBtnStyle: {
		padding: 20,
		position: "absolute"
	},
	itemStyle: {
		alignSelf: "flex-start"
	},
	historyStyle: {
		alignSelf: "flex-end"
	}
});
