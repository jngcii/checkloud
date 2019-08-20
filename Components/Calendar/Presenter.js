import React from "react";
import styled from "styled-components";
import MonthTranslator from "../MonthTranslator";
import PlanBoxPreview from "../PlanBoxPreview";

const Wrapper = styled.View`
	width: 100%;
`;

const Header = styled.View`
	${props => props.theme.monthHeader};
`;
const MonthText = styled.Text`
	${props => props.theme.monthText};
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
	justify-content: space-evenly;
	align-items: center;
`;

const Row = styled.View`
	width: 100%;
`;
const DateDiv = styled.View`
	width: 100%;
	flex-direction: row;
`;

const DateSpan = styled.TouchableOpacity`
	width: 14%;
	height: 40px;
	opacity: ${props => (props.disabled ? 0.3 : 1)};
	align-items: center;
	justify-content: center;
`;
const DateText = styled.Text`
	font-size: ${props => props.theme.calendarDateFontSize};
	font-weight: ${props => props.theme.calendarDateFontWeight};
	color: ${props =>
		props.selected ? props.theme.whiteColor : props.theme.blackColor};
`;
const DatePicked = styled.View`
	position: absolute;
	width: 28px;
	height: 28px;
	border-radius: 14px;
	background-color: ${props => props.theme.doneBtnColor};
`;

const PreviewDiv = styled.ScrollView.attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false
})`
	width: 100%;
	height: 190px;
`;

const DetailDiv = styled.View`
	width: 100%;
`;

export default ({
	date,
	data,
	rowSelected,
	dateSelected,
	calendar,
	isScrollingPrv,
	// func
	onPressDate
}) => {
	const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	return (
		<Wrapper>
			<Header>
				<MonthText>{MonthTranslator(date.value.getMonth())}</MonthText>
			</Header>

			<Body>
				<DateHeader>
					{WEEK.map(w => (
						<DayTitleSpan key={w}>
							<DayTitle isWeekend={w == "SUN"}>{w}</DayTitle>
						</DayTitleSpan>
					))}
				</DateHeader>

				<DateBody>
					{calendar.map((row, rowId) => (
						<Row key={rowId}>
							<DateDiv>
								{row.map((d, dateId) => (
									<DateSpan
										key={dateId}
										disabled={
											!(
												data &&
												data.filteredHistories.filter(
													h =>
														h.year == d.year &&
														h.month == d.month &&
														h.date == d.date
												)[0]
											)
										}
										onPressOut={() =>
											onPressDate({
												row: rowId,
												date: data.filteredHistories.filter(
													h =>
														h.year == d.year &&
														h.month == d.month &&
														h.date == d.date
												)[0]
											})
										}
									>
										{dateSelected.value != null &&
											dateSelected.value.date ==
												d.date && <DatePicked />}

										<DateText
											selected={
												dateSelected.value != null &&
												dateSelected.value.date ==
													d.date
											}
										>
											{d.date}
										</DateText>
									</DateSpan>
								))}
							</DateDiv>

							{rowSelected.value == rowId && dateSelected.value && (
								<PreviewDiv
									onMomentumScrollBegin={() =>
										isScrollingPrv.setValue(true)
									}
									onMomentumScrollEnd={() =>
										isScrollingPrv.setValue(false)
									}
								>
									{dateSelected.value.plans.map(p => (
										<PlanBoxPreview
											key={p.id}
											plan={p}
											isScrollingPrv={isScrollingPrv}
											isNow={true}
										/>
									))}
								</PreviewDiv>
							)}

							{false && <DetailDiv />}
						</Row>
					))}
				</DateBody>
			</Body>
		</Wrapper>
	);
};
