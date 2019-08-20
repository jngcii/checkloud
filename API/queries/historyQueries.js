import gql from "graphql-tag";

export const GET_HISTORIES = gql`
	{
		histories @client {
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
	}
`;

export const GET_FILTERED_HISTORIES = gql`
	query filteredHistories($month: Int) {
		filteredHistories(month: $month) @client {
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
	}
`;
