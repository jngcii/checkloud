import gql from "graphql-tag";

export const GET_PLANS = gql`
	{
		plans @client {
			id
			title
			startAt
			repeat
			itemActs @client {
				id
				keyword
				color
				isChecked
				parentId
				childKeywords
				finishedTime
				memo
			}
			isUsed
			isActive
			isMain
		}
	}
`;
