const { AuthError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parents, args) => {
            return await User.findById(args._id).populate("savedBooks");
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthError('Invalid credentials');
            }
            
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthError('Invalid credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { input }) => {
            console.log(input);
            return await User.findByIdAndUpdate(
                { _id : user._id },
                { $addToSet:{ savedBooks: input } },
                { new: true, runValidators: true});
        },
        removeBook: async (parent, { bookId })=> {
            return await User.findByIdAndUpdate(
                { _id : user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true });
        },
    },
};

module.exports = resolvers;