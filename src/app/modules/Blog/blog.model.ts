import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import generateSlug from "../../utils/generateSlug";
import { BlogModel, TBlog, TImage } from "./blog.interfaces";

const imageSchema = new Schema<TImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, unique: true },
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

blogSchema.pre("save", function (next) {
  this.slug = generateSlug(this.title);
  next();
});

blogSchema.pre("findOneAndUpdate", async function (next) {
	const update = this.getUpdate() as Partial<TBlog>;
	if (update.title) {
		update.slug = generateSlug(update.title);
		this.setUpdate(update);
	}
	next();
});

const Blog = model<TBlog, BlogModel>("Blog", blogSchema);

export default Blog;
