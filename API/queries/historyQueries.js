import gql from "graphql-tag";

export const GET_HISTORIES = gql`
	{
		id
		year
		month
		date
		day
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
