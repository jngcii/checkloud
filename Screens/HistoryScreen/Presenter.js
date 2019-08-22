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
	width: 95%;
	height: 36px;
	align-self: center;
	flex-direction: row;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
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

export default ({
	stickyIndex,
	feeds,
	loading,
	mode,
	barX,
	panResponder,
	refetch
}) => (
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
				height: 3,
				paddingHorizontal: 5,
				transform: [{ translateX: barX.location.x }, { translateY: -3 }]
			}}
		>
			<Bar />
		</Animated.View>

		<Body>
			{mode.value == "feed" ? (
				<FeedScreen
					stickyIndex={stickyIndex}
					feeds={feeds}
					loading={loading}
					refetch={refetch}
				/>
			) : (
				<CalendarScreen />
			)}
		</Body>
	</Wrapper>
);
