import gql from "graphql-tag";

export const SIGN_UP = gql`
	mutation signup($username: String!, $name: String!, $password: String!) {
		signup(username: $username, name: $name, password: $password) {
            token
            user {
                id
                username
                name
                plans {
                    id
                    title
                    startAt
                    itemActs {
                        id
                        keyword
                        color
                        isChecked
                        parentItem
                        childItems
                        finishedTime
                        memo
                        order
                    }
                    isActive
                    isMain
                }
                items {
                    id
                    keyword
                    color
                    order
                    parentItem {
                        id
                        keyword
                        color
                        order
                    }
                    childItems {
                        id
                        keyword
                        color
                        order
                    }
                }
                planCount
                activePlanCount
                itemCount
            }
		}
	}
`;

export const SAVE_TOKEN = gql`
    mutation userLogIn($token: String!) {
        userLogIn(token: $token) @client
    }
`;

export const LOG_OUT = gql`
    mutation userLogOut {
        userLogOut @client
    }
`;