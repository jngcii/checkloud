import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	width: 100%;
	justify-content: center;
	font-size: ${props => props.theme.planTitleFontSize};
	font-weight: ${props => props.theme.planTitleFontWeight};
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
		onSubmitEditing={onSubmitEditing}
	/>
);
