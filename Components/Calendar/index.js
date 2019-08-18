import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
`;

const Header = styled.View`
	width: 100%;
	height: 45px;
	align-items: center;
	justify-content: center;
`;
const MonthText = styled.Text`
	font-size: ${props => props.theme.monthFontSize};
	font-weight: ${props => props.theme.monthFontWeight};
	color: ${props => props.theme.blackColor};
`;

const Body = styled.View`
	width: 100%;
`;

const DateHeader = styled.View`
	width: 100%;
	height: 40px;
	flex-direction: row;
	justify-content: space-evenly;
`;

const DayTitleSpan = styled.View`
	width: 14%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const DayTitle = styled.Text`
	font-size: ${props => props.theme.dayTitleFontSize};
	font-weight: ${props => props.theme.dayTitleFontWeight};
	color: ${props =>
		props.isWeekend ? props.theme.redColor : props.theme.greyColor};
`;

const DateBody = styled.View`
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
`;

const DateSpan = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 14%;
	height: 40px;
	opacity: ${props => (props.isNone ? 0.4 : 1)};
	align-items: center;
	justify-content: center;
`;
const DateText = styled.Text`
	font-size: ${props => props.theme.calendarDateFontSize};
	font-weight: ${props => props.theme.calendarDateFontWeight};
	color: ${props =>
		props.isWeekend ? props.theme.redColor : props.theme.blackColor};
`;

export default () => {
	const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

	return (
		<Wrapper>
			<Header>
				<MonthText>August</MonthText>
			</Header>

			<Body>
				<DateHeader>
					{WEEK.map(w => (
						<DayTitleSpan key={w}>
							<DayTitle>{w}</DayTitle>
						</DayTitleSpan>
					))}
				</DateHeader>

				<DateBody>
					{DAYS.map(d => (
						<DateSpan key={d}>
							<DateText>{d}</DateText>
						</DateSpan>
					))}
				</DateBody>
			</Body>
		</Wrapper>
	);
};
