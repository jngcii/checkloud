import gql from "graphql-tag";

export const GET_PLANS = gql`
	{
		plans @client {
			id
			title
			startAt
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
			isActive
			isMain
		}
	}
`;

export const GET_FEED = gql`
	query feed($to: Int!) {
		feed(to: $to) @client {
			id
			title
			startAt
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
			isActive
			isMain
		}
	}
`;

export const ADD_PLAN = gql`
	mutation addPlan($title: String!, $itemActs: [ItemAct!]!) {
		addPlan(title: $title, itemActs: $itemActs) @client
	}
`;

export const EDIT_PLAN = gql`
	mutation editPlan($id: String!, $title: String, $itemActs: [ItemAct]) {
		editPlan(id: $id, title: $title, itemActs: $itemActs) @client
	}
`;

export const DEACTIVATE_PLAN = gql`
	mutation deactivatePlan($id: String!) {
		deactivatePlan(id: $id) @client
	}
`;
