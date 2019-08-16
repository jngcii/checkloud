import gql from "graphql-tag";

export const GET_ITEMS = gql`
	{
		items @client {
			id
			keyword
			color
			parentId
			childIds
		}
	}
`;

export const GET_ITEM = gql`
	query item($id: String!) {
		item(id: $id) @client {
			id
			keyword
			color
			parentId
			childIds
		}
	}
`;

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

export const GET_PARENT_KEYWORDS = gql`
	query parentKeywords($id: String!) {
		parentKeywords(id: $id) @client
	}
`;

export const ADD_ITEM = gql`
	mutation addItem($keyword: String!, $color: String!, $parentId: String) {
		addItem(keyword: $keyword, color: $color, parentId: $parentId) @client
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

export const ADD_ITEM_ACT = gql`
	mutation addItemAct($keyword: String!) {
		addItemAct(keyword: $keyword) @client {
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

export const EDIT_ITEM_ACT = gql`
	mutation editItemAct($id: String!, $keyword: String!) {
		editItemAct(id: $id, keyword: $keyword) @client
	}
`;

export const REMOVE_ITEM_ACT = gql`
	mutation removeItemAct($id: String!) {
		removeItemAct(id: $id) @client
	}
`;

export const CHECK_ITEM = gql`
	mutation checkItem($id: String!) {
		checkItem(id: $id) @client
	}
`;
