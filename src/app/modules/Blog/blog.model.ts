import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { TBlog, BlogModel } from "./blog.interfaces";

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: imageSchema,
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

blogSchema.statics.isBlogExists = async function (id: string) {
  const blog = await this.findById(id);
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  return blog;
};

blogSchema.statics.findBlogByTitle = async function (title: string) {
  const blog = await this.findOne({ title });
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Blog with this title not found");
  return blog;
};

const Blog = model<TBlog, BlogModel>("Blog", blogSchema);

export default Blog;
