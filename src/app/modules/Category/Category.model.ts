import { Schema, model } from "mongoose";
import generateSlug from "../../utils/generateSlug";
import { TCategory } from "./Category.types";

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("save", function (next) {
  this.slug = generateSlug(this.name);
  next();
});


CategorySchema.pre("findOneAndUpdate", async function (next) {
	const update = this.getUpdate() as Partial<TCategory>;
	if (update.name) {
		update.slug = generateSlug(update.name);
		this.setUpdate(update);
	}
	next();
});



const Category = model<TCategory>("Category", CategorySchema);

export default Category;
