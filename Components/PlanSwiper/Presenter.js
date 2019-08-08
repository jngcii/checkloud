import React from "react";
import { Dimensions } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import styled from "styled-components";

const { height } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	height: ${height - getBottomSpace() - 120};
	position: absolute;
`;

// 이게 swiper 혹은 scrollView가 돼야 한다.
const SwiperWrapper = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
`;

//  이건 컴퍼넌트 분리 해야한다.
const PlanBox = styled.SafeAreaView`
	width: 95%;
	height: 98%;
	background-color: ${props => props.theme.planBoxColor};
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
`;
const Text = styled.Text``;

export default () => (
	<Wrapper>
		<SwiperWrapper>
			<PlanBox>
				<Text>hi</Text>
			</PlanBox>
		</SwiperWrapper>
	</Wrapper>
);
