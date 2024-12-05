import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interfaces";
import Blog from "./blog.model";

const createBlog = async (blogData: Partial<TBlog>) => {
  const blog = new Blog({ ...blogData });
  await blog.save();
  return blog;
};

const getBlogById = async (blogId: string) => {
  const blog = await Blog.findById(blogId).populate("category");
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!");
  }
  return blog;
};

const updateBlog = async (
  blogId: string,
  updateData: Partial<TBlog>,
) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!");
  }
  Object.assign(blog, updateData);
  await blog.save();
  return blog;
};

const getBlogs = async (
  searchQuery: Record<string, unknown>,
  skip: number,
  limit: number
) => {
  const queryCondition: Record<string, unknown> = {};
  const { search, category } = searchQuery;

  if (search) {
    queryCondition.title = { $regex: search as string, $options: "i" };
  }

  if (category) {
    queryCondition.category = category;
  }

  const blogs = await Blog.find(queryCondition)
    .skip(skip)
    .limit(limit)
    .populate("category")
    .lean();

  const totalBlogs = await Blog.countDocuments(queryCondition);

  return { blogs, totalBlogs };
};



const deleteBlog = async (blogId: string, ) => {
  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found or not authorized!");
  }

  return deletedBlog;
};

export const BlogServices = {
  createBlog,
  updateBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
};