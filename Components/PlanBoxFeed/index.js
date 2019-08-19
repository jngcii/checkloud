import React from "react";
import styled from "styled-components";
import WeekTranslator from "../WeekTranslator";
import MonthTranslator from "../MonthTranslator";
import ParentItems from "../ParentItems";

const Wrapper = styled.View`
	width: 100%;
	padding: 10px;
`;

const Box = styled.View`
	width: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.planBoxColor};
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
`;

const Header = styled.View`
	width: 100%;
	height: 50px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	padding: 0 20px;
	justify-content: center;
	background-color: ${props => props.color};
`;
const Title = styled.Text`
	font-size: ${props => props.theme.planTitleFontSize};
	font-weight: ${props => props.theme.planTitleFontWeight};
	color: ${props => props.theme.whiteColor};
`;

const Date = styled.View`
	width: 100%;
	height: 20px;
	padding: 0 20px;
	justify-content: center;
	background-color: ${props => props.color};
`;
const DateText = styled.Text`
	font-size: ${props => props.theme.dateFontSize};
	font-weight: ${props => props.theme.dateFontWeight};
	color: ${props => props.theme.submitBtnColor};
`;

const PercentageText = styled.Text`
	position: absolute;
	font-family: Courier;
	font-size: ${props => props.theme.percentageFontSize - 5};
	font-weight: ${props => props.theme.percentageFontWeight};
	font-style: italic;
	color: ${props => props.theme.whiteColor};
	top: 18px;
	right: 10px;
	opacity: 0.5;
`;

const Body = styled.View`
	width: 100%;
	align-items: center;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	background-color: ${props => props.theme.bgColor};
	overflow: hidden;
`;

const ItemBox = styled.View`
	width: 100%;
	padding: 0 5px;
	flex-direction: row;
`;

const ColorSpan = styled.View`
	width: 30px;
	align-self: center;
	align-items: center;
	justify-content: center;
`;
const Color = styled.View`
	width: 18px;
	height: 18px;
	border-radius: 9px;
	background-color: ${props =>
		props.isChecked ? props.color : props.theme.borderColor};
	${props => props.isChecked && `box-shadow: 0 0 2px rgba(0,0,0,0.3);`};
`;
const KeywordSpan = styled.View`
	flex: 1;
	padding: 5px 15px;
	border-color: ${props => props.theme.feedItemBorderColor};
	border-bottom-width: 1px;
`;
const Keyword = styled.Text`
	line-height: 25px;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: 600;
	color: ${props => props.theme.blackColor};
	opacity: ${props => (props.theme.isChecked ? 0.5 : 0.9)};
	/* background-color: pink; */
`;

const Parents = styled.View`
	width: 100%;
	height: 25px;
	justify-content: center;
`;

const Memo = styled.View`
	width: 100%;
`;

const Complete = styled.Text`
	position: absolute;
	bottom: 5px;
	right: 5px;
	font-size: ${props => props.theme.completeFontSize};
	font-weight: ${props => props.theme.completeFontWeight};
	color: ${props => props.theme.doneBtnColor};
`;

const Btns = styled.View`
	width: 100%;
	height: 50px;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	padding: 0 15px;
`;
const Btn = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
`;
const ShowMoreIcon = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	position: absolute;
	width: 30px;
	height: 30px;
	transform: rotate(-90deg);
`;
const ReuseIcon = styled.Image.attrs({
	source: require("../../assets/icons/useThisIcon.png")
})`
	width: 20px;
	height: 20px;
`;
const RemoveIcon = styled.Image.attrs({
	source: require("../../assets/icons/garbageIcon.png")
})`
	width: 20px;
	height: 20px;
`;

const ItemAct = ({ item }) => (
	<ItemBox>
		<ColorSpan>
			<Color isChecked={item.isChecked} color={item.color} />
		</ColorSpan>

		<KeywordSpan>
			<Keyword style={{ textAlignVertical: "center" }}>
				{item.keyword}
			</Keyword>

			{item.parentId && (
				<Parents>
					<ParentItems id={item.parentId} />
				</Parents>
			)}

			{item.memo.length > 0 && <Memo />}
		</KeywordSpan>

		{item.isChecked && <Complete>Complete</Complete>}
	</ItemBox>
);

export default ({ plan }) => {
	return (
		<Wrapper>
			<Box>
				<Header color={plan.itemActs[0].color}>
					<Title>{plan.title}</Title>

					<PercentageText>
						{Math.round(
							(plan.itemActs.filter(i => i.isChecked).length /
								plan.itemActs.length) *
								100
						)}
						%
					</PercentageText>
				</Header>

				<Date color={plan.itemActs[0].color}>
					<DateText>
						{WeekTranslator(plan.startAt[3])} {plan.startAt[2]}{" "}
						{MonthTranslator(plan.startAt[1])} {plan.startAt[0]}
					</DateText>
				</Date>

				<Body>
					{plan.itemActs.slice(0, 5).map(i => (
						<ItemAct key={i.id} item={i} />
					))}

					{plan.itemActs.length > 5 && (
						<Btn>
							<ShowMoreIcon style={{ tintColor: "#ccc" }} />
						</Btn>
					)}

					<Btns>
						<Btn>
							<ReuseIcon style={{ tintColor: "#555" }} />
						</Btn>

						<Btn>
							<RemoveIcon style={{ tintColor: "#555" }} />
						</Btn>
					</Btns>
				</Body>
			</Box>
		</Wrapper>
	);
};
