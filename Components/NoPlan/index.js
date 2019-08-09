import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: ${width};
	height: 100%;
	align-items: center;
`;
const PlanBox = styled.SafeAreaView`
	width: 95%;
	height: 98%;
	background-color: ${props => props.theme.planBoxColor};
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`;

export default () => (
	<Wrapper>
		<PlanBox />
	</Wrapper>
);
