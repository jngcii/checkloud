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

    type Mutation {}

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
		repeat: [String]
		itemActs: [ItemAct]
		isUsed: Boolean!
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
		childKeywords: [String]
		finishedTime: [Int]
		memo: String
    }
`;

export const resolvers = {
	Query: {},
	Mutation: {}
};
