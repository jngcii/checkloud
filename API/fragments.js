import gql from "graphql-tag";

// ************************************************************
// Item Fragments

export const ITEM_FRAGMENT = gql`
	fragment ItemParts on Item {
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

export const PLAN_FRAGMENT = gql`
	fragment PlanParts on Plan {
		id
		title
		startAt
		itemActs {
			id
			keyword
			color
			isChecked
			parentId
			childIds
			finishedTime
			memo
		}
		isActive
		isMain
	}
`;
