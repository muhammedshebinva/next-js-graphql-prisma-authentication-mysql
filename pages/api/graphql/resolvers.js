const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();

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
    // //new
    // signup: async (_, { email, password, name }) => {
    //   // Hash the password (assuming you have password hashing logic)
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
    //   // Create a new user without relying on context.user
    //   const user = await prisma.user.create({
    //     data: {
    //       email,
    //       password: hashedPassword,
    //       name
    //     },
    //   });
  
    //   return user; // Return the created user object
    // },
    // login: async (_, { email, password }) => {
    //   const user = await prisma.user.findUnique({ where: { email } });

    //   if (!user) {
    //     throw new Error('Invalid credentials');
    //   }

    //   const passwordValid = await bcrypt.compare(password, user.password);

    //   if (!passwordValid) {
    //     throw new Error('Invalid credentials');
    //   }

    //   // Generate JWT token based on user data
    //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    //   return { token, user }; // Return user data and token
    // },
  },
  Query: {
    
   
      me: async (_, __, { req, user }) => {
        // Check if user is authenticated (using context object)
        if (!user) {
          throw new Error('Unauthorized me');
        }
  
        // Fetch user data based on user ID from context
        const me = await prisma.user.findUnique({ where: { id: user.id } });
  
        return me;
      },
    

  },


};

module.exports = { resolvers };