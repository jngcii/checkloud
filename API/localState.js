import uuidv1 from "uuid/v1";
import { ITEM_FRAGMENT } from "./fragments";
import { GET_ITEM_ACTS } from "./queries/itemQueries";
import { GET_PLANS } from "./queries/planQueries";
import { saveItemActs, savePlans } from "./offline";

export const typeDefs = `
    type Query {
        histories: [History]
        
        plans: [Plan]
        plan(id: String!): Plan
        
        items: [Item]
        item(id: String!): Item
        itemSgts: [ItemSgt]
        itemActs: [ItemAct]		
        
        parentKeywords(id: String!): [String]
    }

    type Mutation {
        addItemActs(itemActs: [ItemAct]): [ItemAct]
        addPlan(title: String!, itemActs: [ItemAct!]!): Boolean!
    }

	type History {
		id: String!
		year: Int!
		month: Int!
		date: Int!
		day: Int!
		plans: [Plan]
	}

    type Plan {
        id: String!
		title: String!
		startAt: [Int]
		itemActs: [ItemAct]
        isActive: Boolean!
		isMain: Boolean!
	}

    type Item {
        id: String!
        keyword: String!
        color: String!
        parentId: String
        childIds: [String]
    }
    type ItemSgt {
        id: String!
        keyword: String!
        color: String!
    }
    type ItemAct {
        id: String!
        keyword: String!
        color: String!
        isChecked: Boolean!
        parentId: String
        childIds: [String]
		finishedTime: [Int]
		memo: String
    }
`;

export const resolvers = {
	Query: {
		item: (_, { id }, { cache }) => {
			const itemId = cache.config.dataIdFromObject({
				__typename: "Item",
				id
			});

			const item = cache.readFragment({
				fragment: ITEM_FRAGMENT,
				id: itemId
			});

			return item;
		}
	},

	Mutation: {
		// add Mutation
		// ******************************************************************

		addItemActs: async (_, { itemActs: itemActsNew }, { cache }) => {
			let newItemActs = [];

			itemActsNew.forEach(i => {
				const newItemAct = {
					__typename: "ItemAct",
					id: uuidv1(),
					keyword: i.keyword,
					color: i.color,
					isChecked: false,
					parentId: i.parentId,
					childIds: i.childIds,
					finishedTime: [],
					memo: ""
				};

				newItemActs.push(newItemAct);
			});

			const { itemActs } = await cache.readQuery({
				query: GET_ITEM_ACTS
			});

			try {
				await cache.writeData({
					data: {
						itemActs: [...newItemActs, ...itemActs]
					}
				});
				await saveItemActs(cache);

				return newItemActs;
			} catch {
				return null;
			}
		},

		addPlan: async (_, { title, itemActs }, { cache }) => {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth();
			const date = today.getDate();
			const day = today.getDay();

			const newPlan = {
				__typename: "Plan",
				id: uuidv1(),
				title,
				startAt: [year, month, date, day],
				itemActs,
				isActive: true,
				isMain: true
			};

			const { plans } = await cache.readQuery({
				query: GET_PLANS
			});

			try {
				await cache.writeData({
					data: {
						plans: [newPlan, ...plans]
					}
				});
				await savePlans(cache);

				return true;
			} catch {
				return false;
			}
		}
	}
};
