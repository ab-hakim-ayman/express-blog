import deleteCloudinaryImage from '../../utils/deleteCloudinaryImage';
import Blog from '../Blog/blog.model';
import Category from '../Category/Category.model';
import Comment from '../Comment/comment.model';

const DashboardStates = async () => {
	const totalBlogs = await Blog.countDocuments();
	const totalComments = await Comment.countDocuments();
	const totalCategories = await Category.countDocuments();

	return {
		totalBlogs,
		totalComments,
		totalCategories
	};
};

const deleteImage = async (publicId: string) => {
	const res = await deleteCloudinaryImage(publicId);
	return res;
};

export const SystemServices = {
	DashboardStates,
	deleteImage
};
