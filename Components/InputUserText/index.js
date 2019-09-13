import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	width: 100%;
	justify-content: center;
	font-size: ${props => props.theme.userInputFontSize};
	font-weight: ${props => props.theme.userInputFontWeight};
	color: ${props => props.theme.greyColor};
`;

export default ({
	placeholder = "",
	value = "",
	onChange,
	type = "text",
	onSubmitEditing = null,
	onFocus = null
}) => (
	<InputText
		placeholder={placeholder}
		value={value}
		onChangeText={onChange}
		type={type}
		require={true}
		autoCapitalize={"none"}
		autoCorrect={false}
		returnKeyType={"done"}
		onSubmitEditing={onSubmitEditing}
		onFocus={onFocus}
	/>
);
