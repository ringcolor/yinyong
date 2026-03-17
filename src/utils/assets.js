// 获取正确的静态资源路径
export function getAssetUrl(path) {
  if (!path) return null
  const base = import.meta.env.BASE_URL
  const cleanPath = path.replace(/^\//, '')
  return `${base}${cleanPath}`
}