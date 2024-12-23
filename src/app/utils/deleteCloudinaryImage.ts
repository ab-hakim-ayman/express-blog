import { v2 as cloudinary } from 'cloudinary';

const deleteCloudinaryImage = async (publicId: string) => {
	try {
		await cloudinary.uploader.destroy(publicId);
	} catch (error) {
		console.log(error);
	}
};

export default deleteCloudinaryImage;
