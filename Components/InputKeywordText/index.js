import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	width: 100%;
	height: 100%;
	justify-content: center;
	font-size: ${props => props.theme.itemFontSize};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props => props.theme.blackColor};
`;

export default ({
	placeholder = "",
	value = "",
	onChange,
	onSubmitEditing = null
}) => (
	<InputText
		placeholder={placeholder}
		value={value}
		onChangeText={onChange}
		type={"text"}
		autoCapitalize={"none"}
		autoCorrect={false}
		returnKeyType={"done"}
		blurOnSubmit={false}
		onSubmitEditing={onSubmitEditing}
		style={{ textAlignVertical: "center" }}
	/>
);
