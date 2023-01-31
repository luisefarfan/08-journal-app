import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
  cloud_name: 'dhmn4hjie',
  api_key: '951214777543449',
  api_secret: 'i8T14QNKqRh5upNomwsxIVirkLA',
  secret: true
})

describe('File upload tests', () => {
  it('should upload the file correctly to cloudinary', async () => {
    const imageUrl = 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpc2FqZXxlbnwwfHwwfHw%3D&w=1000&q=80'

    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'testPhoto.png')

    const url = await fileUpload(file)
    expect(typeof url).toBe('string')
    expect(url).toContain('https')

    // Delete the image from cloudinary
    const id = url.split('/').at(-1).split('.').at(0)
    await cloudinary.api.delete_resources(['journal/' + id])
  })

  it('should return null', async () => {
    const file = new File([], 'testPhoto.png')

    const url = await fileUpload(file)
    expect(url).toBeNull()
  })
})
