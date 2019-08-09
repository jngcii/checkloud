import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.View`
	${props => props.theme.itemActBox};
`;

const RemoveSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const RemoveIcon = styled.Image.attrs({
	source: require("../../assets/icons/minusIcon.png")
})`
	width: 24px;
	height: 24px;
`;

const KeywordSpan = styled.View`
	flex: 1;
	justify-content: center;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
`;
const Keyword = styled.Text`
	line-height: 30px;
	vertical-align: middle;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;

export default () => (
	<BoxWrapper>
		<RemoveSpan>
			<RemoveIcon style={{ tintColor: "#f54278" }} />
		</RemoveSpan>

		<KeywordSpan>
			<Keyword>Keyword</Keyword>
		</KeywordSpan>
	</BoxWrapper>
);
