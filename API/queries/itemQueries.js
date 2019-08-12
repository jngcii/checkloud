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

export const ADD_ITEM = gql`
	mutation addItem($keyword: String!, Color: String!, parentId: String){
		addItem (keyword: $keyword: color: $color: parentId: $parentId)@client {
			id
			keyword
			color
			parentId
			childIds
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
