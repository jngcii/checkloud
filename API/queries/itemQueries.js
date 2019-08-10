import gql from "graphql-tag";

export const GET_ITEM_ACTS = gql`
	{
		itemActs @client {
			id
			keyword
			color
			isChecked
			parentId
			childIds
			finishedTime
			memo
		}
	}
`;

export const ADD_ITEM_ACTS = gql`
	mutation addItemActs($itemActs: [ItemAct]) {
		addItemActs(itemActs: $itemActs) @client {
			id
			keyword
			color
			isChecked
			parentId
			childIds
			finishedTime
			memo
		}
	}
`;
