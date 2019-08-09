import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components";
import PlanSwiper from "../../Components/PlanSwiper";
import ItemPicker from "../../Components/ItemPicker";

const { width } = Dimensions.get("window");

const Wrapper = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;
	background-color: ${props => props.theme.bgColor};
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
	width: 12px;
	height: 12px;
	border-radius: 6px;
	margin: 0 5px;
	background-color: ${props => props.theme.blackColor};
`;

const Footer = styled.View`
	width: 100%;
	height: 100px;
`;
const PercentBarWrapper = styled.TouchableOpacity`
	width: ${width - 200};
	height: 100px;
	padding: 20px 0;
	position: absolute;
	align-self: center;
`;
const PercentBarBtn = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.bgColor};
	${props => props.theme.navShadow};
`;
const NavBtn = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.navBtnColor};
	${props => props.theme.navShadow};
`;

const Preview = () => (
	<PreviewWrapper>
		<PreviewHeader />
		<PreviewBody />
	</PreviewWrapper>
);

const Pagination = ({ plans }) => (
	<PaginationWrapper>
		<Dot />
		{plans.length > 0 ? plans.forEach(p => <Dot />) : <Dot />}
	</PaginationWrapper>
);

const PercentBar = () => (
	<PercentBarWrapper>
		<PercentBarBtn />
	</PercentBarWrapper>
);

const Item = () => (
	<Animated.View style={[styles.navBtnStyle, styles.itemStyle]}>
		<NavBtn />
	</Animated.View>
);

const History = () => (
	<Animated.View style={[styles.navBtnStyle, styles.historyStyle]}>
		<NavBtn />
	</Animated.View>
);

export default ({
	plans,
	addedItem,
	addedItemSgt,
	addedItemAct,
	scrollRef,
	navY,
	pickerY
}) => (
	<React.Fragment>
		<Wrapper>
			<Preview />
			<Pagination plans={plans} />

			<Footer>
				<Animated.View
					style={[
						styles.navStyle,
						{ transform: [{ translateY: navY.location.y }] }
					]}
				>
					<PercentBar />

					<Item />

					<History />
				</Animated.View>

				<Animated.View
					style={[
						styles.pickerStyle,
						{ transform: [{ translateY: pickerY.location.y }] }
					]}
				>
					<ItemPicker />
				</Animated.View>
			</Footer>
		</Wrapper>

		<PlanSwiper
			plans={plans}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			scrollRef={scrollRef}
		/>
	</React.Fragment>
);

const styles = StyleSheet.create({
	navStyle: {
		width: "100%",
		height: "100%",
		position: "absolute"
	},
	pickerStyle: {
		width: "100%",
		height: "100%",
		padding: 20,
		position: "absolute"
	},
	navBtnStyle: {
		width: 100,
		height: 100,
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
