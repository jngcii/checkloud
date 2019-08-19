import React from "react";
import styled from "styled-components";
import MonthTranslator from "../../Components/MonthTranslator";
import WeekTranslator from "../../Components/WeekTranslator";
import PlanBoxFeed from "../../Components/PlanBoxFeed";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const MonthHeader = styled.View`
	${props => props.theme.monthHeader};
`;
const MonthText = styled.Text`
	${props => props.theme.monthText};
`;

const Body = styled.View`
	flex: 1;
	width: 100%;
`;

const VerticalLine = styled.View`
	position: absolute;
	width: 2px;
	height: 100%;
	margin-left: 35px;
	background-color: #ddd;
`;

const Content = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	overScrollMode: "always"
})`
	flex: 1;
	width: 100%;
`;

const Sticky = styled.View`
	top: 20px;
	width: 70px;
	height: 36px;
	align-items: center;
	justify-content: center;
`;
const BigDate = styled.View`
	width: 40px;
	background-color: ${props => props.theme.planBoxColor};
	box-shadow: 0 0 8px rgba(246, 246, 246, 0.5);
	align-items: center;
`;
const BigDateText = styled.Text`
	font-size: ${props => props.theme.planTitleFontSize};
	font-weight: ${props => props.theme.planTitleFontWeight};
	color: ${props =>
		props.isWeekend ? props.theme.redColor : props.theme.greyColor};
`;
const DayText = styled.Text`
	font-size: ${props => props.theme.dateFontSize};
	font-weight: 500;
	color: ${props => props.theme.greyColor};
`;

const PlanContainer = styled.View`
	top: -30px;
	width: 100%;
	padding-left: 50px;
	padding-bottom: 15px;
`;

export default ({ stickyIndex, renderItems }) => (
	<Wrapper>
		<MonthHeader>
			<MonthText>{MonthTranslator(renderItems.array[0].month)}</MonthText>
		</MonthHeader>

		<Body>
			<VerticalLine />

			<Content stickyHeaderIndices={stickyIndex.array}>
				{renderItems.array.map((i, index) =>
					i.date ? (
						<Sticky key={index}>
							<BigDate>
								<BigDateText>{i.date}</BigDateText>
								<DayText>
									{WeekTranslator(i.day).slice(0, 3)}
								</DayText>
							</BigDate>
						</Sticky>
					) : (
						<PlanContainer key={index}>
							<PlanBoxFeed plan={i} />
						</PlanContainer>
					)
				)}
			</Content>
		</Body>
	</Wrapper>
);
