/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TImage = {
  url: string;
  publicId: string;
};

export interface TBlog {
  _id?: Types.ObjectId;
  title: string;
  metaDescription: string;
  content: string;
  category: Types.ObjectId;
  image?: TImage;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogModel extends Model<TBlog> {
  isBlogExists(id: string | Types.ObjectId): Promise<TBlog | null>;
  findBlogByTitle(title: string): Promise<TBlog | null>;
}
