import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (fileBuffer: Buffer, fileName: string) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: fileName
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result?.secure_url)
        }
      )

      uploadStream.end(fileBuffer)
    })
  } catch (error) {
    throw new Error('Failed to upload image')
  }
}

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId)
  } catch (error) {
    throw new Error('Failed to delete image')
  }
}
