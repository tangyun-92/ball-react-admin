import { useEffect, useState } from "react"

/**
 * 图片上传自定义 hooks
 * @param {string} url 需要回显的 url  
 * @returns 
 */
export default function({
  url
}) {
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (url) {
      setImageUrl(url)
    }
  }, [url])

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  /**
   * 上传之后
   */
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return setUploadLoading(true)
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setUploadLoading(false)
        setImageUrl(imgUrl)
      })
    }
  }

  return {
    handleChange,
    uploadLoading,
    imageUrl,
  }
}
