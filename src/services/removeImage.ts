import cloudinary from 'cloudinary';

export const removeImage = (removableImageId: string) => {
    cloudinary.v2.uploader.destroy(removableImageId);
};
