import React from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.navBtnColor};
	${props => props.theme.navShadow};
`;

const Box = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
`;

const Header = styled.View`
	width: 100%;
	height: 60px;
	flex-direction: row;
`;
const GoBackSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const GoBackIcon = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	width: 20px;
	height: 20px;
`;
const UsingSpan = styled.View`
	flex: 1;
	height: 100%;
	justify-content: center;
`;
const UsingItem = styled.Text`
	font-size: ${props => props.theme.itemHeaderFontSize};
	font-weight: ${props => props.theme.itemHeaderFontWeight};
`;
const ArrowSpan = styled.TouchableOpacity`
	width: 60px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const ArrowIcon = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	width: 20px;
	height: 20px;
	${props =>
		props.itemsVisible
			? `transform: rotate(-90deg)`
			: `transform: rotate(90deg)`};
`;

const Body = styled.View`
	width: 100%;
	flex: 1;
`;

const UsedItemWrapper = styled.View`
	width: 100%;
	height: 40px;
	padding-left: 50px;
	flex-direction: row;
	align-items: center;
`;
const ChildsWrapper = styled.ScrollView`
	flex: 1;
	width: 100%;
`;

export default ({ itemsVisible, pickerShape, onChangeShape }) => (
	<Animated.View style={{ width: "100%", height: pickerShape.height }}>
		<Wrapper>
			<Box>
				<Header>
					{false && (
						<GoBackSpan>
							<GoBackIcon style={{ tintColor: "#ccc" }} />
						</GoBackSpan>
					)}

					<UsingSpan>
						<UsingItem />
					</UsingSpan>

					<ArrowSpan onPressOut={onChangeShape}>
						<ArrowIcon
							style={{ tintColor: "#ccc" }}
							itemsVisible={itemsVisible.value}
						/>
					</ArrowSpan>
				</Header>

				<Body>
					<UsedItemWrapper />

					<ChildsWrapper />
				</Body>
			</Box>
		</Wrapper>
	</Animated.View>
);
