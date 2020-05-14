export const typeDefs = `
  type User {
    id: ID!
    email: String!
  }
  
  type Task {
    id: ID!
    name: String!
    description: String!
    due_date: String!
    priority: String!
    notification_date: String!
    userId: ID!
    completed: Boolean!
  }
  
  type Message {
    message: String!
  }
  
  type Query {
    task(id: ID!): Task!
    getTaskByUserId(userId: ID!): [Task]
    tasks: [Task!]!
  }
  
  type LoginResponse {
      token: String
      user: User
   }
  
  type Mutation {
    addUser(email: String!, password: String!): User
    passwordRestore(id: ID!, password: String!, token: String!): User
    sendEmailPasswordRestore(email: String!): Message!
    login(email: String!, password: String!): LoginResponse!    
    
    addTask(name: String!, description: String!, due_date: String!, priority: String!, notification_date: String!, userId: ID!): Task
    updateTask(id: ID!, name: String, description: String, due_date: String, priority: String, notification_date: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
  }
`;
