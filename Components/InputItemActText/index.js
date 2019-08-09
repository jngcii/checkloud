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
	onSubmitEditing,
	onFocus = null
}) => (
	<InputText
		ref={ref}
		placeholder={placeholder}
		value={value}
		onChangeText={onChange}
		type={"text"}
		required={true}
		autoCapitalize={"none"}
		autoCorrect={false}
		returnKeyType={"next"}
		onSubmitEditing={onSubmitEditing}
		onFocus={onFocus}
		blurOnSubmit={false}
		style={{ textAlignVertical: "center" }}
		// multiline={true}
		// numberOfLines={3}
	/>
);
