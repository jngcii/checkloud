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
	background-color: ${props => props.theme.planBoxColor};
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
	align-items: center;
	justify-content: center;
`;

const PlusIcon = styled.Image.attrs({
	source: require("../../assets/icons/addCircleIcon.png")
})`
	width: 30px;
	height: 30px;
	margin: 10px;
`;

const AddPlanText = styled.Text`
	font-size: ${props => props.theme.previewItemFontSize};
	font-weight: ${props => props.theme.percentBarFontWeight};
	color: ${props => props.theme.greyColor};
`;

export default ({
	index,
	listVisible,
	pageIndex,
	swipeRef,
	isScrollingPrv
}) => (
	<Wrapper isNow={index == pageIndex.value}>
		<Box
			disabled={isScrollingPrv.value}
			onPress={() => {
				swipeRef.current.scrollTo({ x: index * width });
				listVisible.setValue(false);
			}}
		>
			<Container>
				<PlusIcon style={{ tintColor: "#777" }} />

				<AddPlanText>새로운 체크리스트 생성</AddPlanText>
			</Container>
		</Box>
	</Wrapper>
);
