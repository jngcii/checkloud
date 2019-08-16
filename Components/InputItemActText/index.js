import React from "react";
import styled from "styled-components";

const InputText = styled.TextInput.attrs({
	placeholderTextColor: "#ccc"
})`
	flex: 1;
	height: 100%;
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
	returnKeyType = "next",
	onSubmitEditing = null,
	onEndEditing = null,
	onFocus = null,
	blurOnSubmit = false
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
		returnKeyType={returnKeyType}
		onSubmitEditing={onSubmitEditing}
		onEndEditing={onEndEditing}
		onFocus={onFocus}
		blurOnSubmit={blurOnSubmit}
		style={{ textAlignVertical: "center" }}
		// multiline={true}
		// numberOfLines={3}
	/>
);
