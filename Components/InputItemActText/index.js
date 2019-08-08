import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	width: 100%;
	justify-content: center;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;

export default ({
	ref = undefined,
	placeholder = "",
	value = "",
	onChange,
	type = "text",
	required = true,
	autoCapitalize = "none",
	autoCorrect = false,
	onSubmitEditing = null,
	onFocus = null
}) => (
	<InputText
		ref={ref}
		placeholder={placeholder}
		value={value}
		onChangeText={onChange}
		type={type}
		required={required}
		autoCapitalize={autoCapitalize}
		autoCorrect={autoCorrect}
		returnKeyType={"next"}
		onSubmitEditing={onSubmitEditing}
		onFocus={onFocus}
		multiline={true}
		textAlignVertical={textAlignVertical}
		numberOfLines={3}
	/>
);
