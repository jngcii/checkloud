import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 140px;
	height: 190px;
	padding: 5px;
	opacity: ${props => (props.isNow ? 1 : 0.4)};
`;

const Box = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.color};
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
	align-items: center;
`;
const Header = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	padding: 10px;
`;
const Title = styled.Text`
	font-size: ${props => props.theme.previewPlanTitleFontSize};
	font-weight: ${props => props.theme.previewPlanTitleFontWeight};
	color: ${props => props.theme.whiteColor};
`;

const Percentage = styled.Text`
	position: absolute;
	bottom: 3px;
	right: 5px;
	font-style: italic;
	font-family: Courier;
	font-size: ${props => props.theme.itemFontSize};
	font-weight: ${props => props.theme.percentageFontWeight};
	color: ${props => props.theme.whiteColor};
	opacity: 0.2;
`;

const Divider = styled.View`
	width: 90%;
	height: 1px;
	align-self: center;
	background-color: ${props => props.theme.whiteColor};
	margin-bottom: 5px;
	opacity: 0.2;
`;

const Body = styled.View`
	flex: 2;
	width: 100%;
`;

const ItemRow = styled.View`
	width: 100%;
	height: 17px;
	justify-content: center;
	padding: 0 5px;
	opacity: 0.8;
`;
const ItemText = styled.Text`
	font-size: ${props => props.theme.previewItemFontSize};
	font-weight: ${props => props.theme.previewItemFontWeight};
	color: ${props => props.theme.whiteColor};
`;
const More = styled.Image.attrs({
	source: require("../../assets/icons/moreIcon.png")
})`
	margin-top: 3px;
	margin-left: 30px;
	width: 12px;
	height: 12px;
	opacity: 0.2;
`;

export default ({
	plan,
	index,
	listVisible,
	pageIndex,
	swipeRef,
	isScrollingPrv
}) => (
	<Wrapper isNow={index == pageIndex.value}>
		{plan == "no" && (
			<Box color="#f6f6f6">
				<Container />
			</Box>
		)}

		{plan != "new" && plan != "no" && (
			<Box
				color={plan.itemActs[0].color}
				disabled={isScrollingPrv.value}
				onPress={() => {
					swipeRef.current.scrollTo({ x: index * width });
					listVisible.setValue(false);
				}}
			>
				<Container>
					<Header>
						<Title>{plan.title}</Title>

						<Percentage>
							{Math.round(
								(plan.itemActs.filter(i => i.isChecked).length /
									plan.itemActs.length) *
									100
							)}
							%
						</Percentage>
					</Header>

					<Divider />

					<Body>
						{plan.itemActs.slice(0, 4).map(i => (
							<ItemRow key={i.id}>
								<ItemText>∙ {i.keyword}</ItemText>
							</ItemRow>
						))}

						{plan.itemActs.length > 4 && (
							<More style={{ tintColor: "#fff" }} />
						)}
					</Body>
				</Container>
			</Box>
		)}
	</Wrapper>
);
