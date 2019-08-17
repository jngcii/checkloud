import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	flex: 1;
	height: 100%;
	justify-content: center;
	font-size: ${props => props.theme.itemFontSize};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props =>
		props.color == "black"
			? props.theme.blackColor
			: props.theme.whiteColor};
`;

export default ({
	placeholder = "",
	value = "",
	onChange,
	onSubmitEditing = null,
	blurOnSubmit = false,
	color = "black",
	autoFocus = false
}) => (
	<InputText
		placeholder={placeholder}
		value={value}
		onChangeText={onChange}
		type={"text"}
		autoCapitalize={"none"}
		autoCorrect={false}
		returnKeyType={"done"}
		blurOnSubmit={blurOnSubmit}
		onSubmitEditing={onSubmitEditing}
		style={{ textAlignVertical: "center" }}
		color={color}
		autoFocus={autoFocus}
	/>
);
