const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    signup: async (_, { email, password, name }, { prisma }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      return user;
    },
    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token with user ID
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set expiration time for the token
      });

      //return { ...user, token }; // Include token in response
      return token;
    },
  },
  Query: {
    me: async (_, __, { prisma, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return await prisma.user.findUnique({ where: { id: currentUser } });
    },

    getUserData: async (parent, args, { prisma }) => {
      const { token } = args;

      if (!token) {
        throw new Error('Unauthorized: Missing token');
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret key
        const userId = decoded.userId;

        // Fetch user data using prisma
        const user = await prisma.user.findUnique({ where: { id: userId } }); // Find by unique ID

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw for proper error handling
      }
    },
  },


};

module.exports = { resolvers };