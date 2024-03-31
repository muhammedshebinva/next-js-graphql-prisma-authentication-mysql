

// context.js working to implement Autherization
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable for secret

const getUserFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    return user;
  } catch (err) {
    return null;
  }
};

const context = async ({ req }) => {
    
  const token = req.headers['authorization'];
  

  if (token) {
    const user = await getUserFromToken(token);
    // Only set user if token is valid
    return { req, prisma, user };
  }

  return { req, prisma }; // Provide basic context without user
};

export default context;