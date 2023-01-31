export const fileUpload = async (file) => {
  if (!file) throw new Error('No se envio ningun archivo para subir')

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhmn4hjie/image/upload'

  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    })

    if (!resp.ok) return null

    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
