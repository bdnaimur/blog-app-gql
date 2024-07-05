import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { db } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    getBlogs: async (_, __, {token, db}) => {
      return await db.collection("blogs").find().toArray();
    },
    getUser: async (_, { username }, {token, db}) => {
      const result = await db.collection("users").findOne({ username });
      return result;
    },
    getUsers: async () => {
      return await db.collection("users").find().toArray();
    },
    
    getMyBlogs: async (_, __, { token, db }) => {
      // console.log("token", token);
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log("decode", decodedToken);
        const myBlogs = await db
          .collection("blogs")
          .find({ "author.id": decodedToken.id })
          .toArray();
          console.log("result", myBlogs);
        return {
          status: {
            code: 200,
            message: "MyBlogs retrieved successfully",
          },
          blog: myBlogs,
        };
      } catch (error) {
        return {
          status: {
            code: 500,
            message: error.message,
          },
          blog: null,
        };
      }
    },
    login: async (_, { email, password }, {token, db}) => {
      try {
        const user = await db.collection("users").findOne({ email });
        if (!user) throw new Error("User not found");
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) throw new Error("Invalid password");
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
          expiresIn: "1h",
        });
        return {
          status: {
            code: 200,
            message: "User found successfully",
          },
          user: {
            ...user,
            token,
          },
        };
      } catch (error) {
        return {
          status: {
            code: 500,
            message: error.message,
          },
          user: null,
        };
      }
    },
  },
  Mutation: {
    register: async (_, { username, email, password, role }, {token, db}) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log("username, email, password, role");
      try {
        const isUserAlreadyExists = await db
          .collection("users")
          .findOne({ email });
        if (isUserAlreadyExists) throw new Error("User already exists");
        const user = {
          id: uuidv4(),
          username,
          email,
          password: hashedPassword,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          role
        };
        await db.collection("users").insertOne(user);
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
          expiresIn: "1h",
        });
        return {
          status: {
            code: 201,
            message: "User created successfully",
          },
          user: {
            ...user,
            token,
          },
        };
      } catch (error) {
        return {
          status: {
            code: 500,
            message: error.message,
          },
          user: null,
        };
      }
    },
    createBlog: async (_, { title, content }, { token,db }) => {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const newBlog = {
          id: uuidv4(),
          title,
          content,
          author: {
            id: decodedToken.id,
            email: decodedToken.email,
          },
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        };
        await db.collection("blogs").insertOne(newBlog);
        return {
          status: {
            code: 201,
            message: "Blog created successfully",
          },
          blog: newBlog,
        };
      } catch (error) {
        return {
          status: {
            code: 500,
            message: error.message,
          },
          blog: null,
        };
      }
    },
    deleteBlog: async (_, { id }, { token,db }) => {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      const blog = await db
        .collection("blogs")
        .findOne({ id, "author.id": decodedToken.id });
      if (!blog) throw new Error("Blog not found or unauthorized");
      await db.collection("blogs").deleteOne({ id });
      return {
        status: {
          code: 200,
          message: "Blog deleted successfully",
        },
      };
    },
    updateBlog: async (_, { id, title, content }, { token,db }) => {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      const blog = await db
        .collection("blogs")
        .findOne({ id, "author.id": decodedToken.id });
      if (!blog) throw new Error("Blog not found or unauthorized");
      const updateFields = {};
      if (title) updateFields.title = title;
      if (content) updateFields.content = content;
      updateFields.updated = new Date().toISOString();
      await db.collection("blogs").updateOne({ id }, { $set: updateFields });
      return {
        status: {
          code: 200,
          message: "Blog updated successfully",
        },
        blog: { ...blog, ...updateFields },
      };
    },
  },
};

export { resolvers };
