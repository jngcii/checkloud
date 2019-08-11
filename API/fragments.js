import gql from "graphql-tag";

// ************************************************************
// Item Fragments

export const ITEM_FRAGMENT = gql`
	fragment ItemPars on Item {
		id
		keyword
		color
		parentId
		childIds
	}
`;

export const ITEM_ACT_FRAGMENT = gql`
	fragment ItemActParts on ItemAct {
		id
		keyword
		color
		isChecked
		parentId
		childIds
		finishedTime
		memo
	}
`;
