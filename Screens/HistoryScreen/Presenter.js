import React from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import FeedScreen from "../FeedScreen";
import CalendarScreen from "../CalendarScreen";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	background-color: ${props => props.theme.planBoxColor};
`;

const ControlBarWrapper = styled.View`
	width: 100%;
	height: 30px;
	align-items: center;
	justify-content: center;
`;
const ControlBar = styled.View`
	width: 50px;
	height: 6px;
	border-radius: 3px;
	background-color: #555;
	opacity: 0.3;
`;

const Header = styled.View`
	width: 100%;
	height: 36px;
	flex-direction: row;
`;

const NavBtn = styled.TouchableOpacity`
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const FeedIcon = styled.Image.attrs({
	source: require("../../assets/icons/feedIcon.png")
})`
	width: 30px;
	height: 30px;
`;
const CalendarIcon = styled.Image.attrs({
	source: require("../../assets/icons/calendarIcon.png")
})`
	width: 33px;
	height: 33px;
`;

const Bar = styled.View`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.doneBtnColor};
`;

const Body = styled.View`
	flex: 1;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	overflow: hidden;
`;

export default ({ history, mode, barX, panResponder }) => (
	<Wrapper>
		<ControlBarWrapper {...panResponder.panHandlers}>
			<ControlBar />
		</ControlBarWrapper>

		<Header>
			<NavBtn onPressOut={() => mode.setValue("feed")}>
				<FeedIcon
					style={{
						tintColor: mode.value == "feed" ? "#333" : "#ccc"
					}}
				/>
			</NavBtn>

			<NavBtn onPressOut={() => mode.setValue("calendar")}>
				<CalendarIcon
					style={{
						tintColor: mode.value == "calendar" ? "#333" : "#ccc"
					}}
				/>
			</NavBtn>
		</Header>

		<Animated.View
			style={{
				width: "50%",
				height: 15,
				padding: 5,
				transform: [{ translateX: barX.location.x }]
			}}
		>
			<Bar />
		</Animated.View>

		<Body>
			{mode.value == "feed" ? (
				<FeedScreen history={history} />
			) : (
				<CalendarScreen history={history} />
			)}
		</Body>
	</Wrapper>
);
