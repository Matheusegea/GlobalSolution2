import { useState } from 'react'

function ProfessionalCard({ profissional, onClick }) {
  const [imageError, setImageError] = useState(false)

  const getImageUrl = (fotoPath) => {
    if (!fotoPath) return null
    try {
      if (fotoPath.startsWith('./assets/')) {
        const imageName = fotoPath.replace('./assets/', '')
        return new URL(`../assets/${imageName}`, import.meta.url).href
      }
      if (fotoPath.startsWith('./')) {
        const path = fotoPath.replace('./', '')
        return new URL(`../${path}`, import.meta.url).href
      }
      return fotoPath
    } catch (error) {
      console.error('Erro ao carregar imagem:', error)
      return null
    }
  }

  const imageUrl = getImageUrl(profissional.foto)
  const initials = profissional.nome.split(' ').map(n => n[0]).join('').substring(0, 2)
  const showImage = imageUrl && !imageError

  return (
    <div
      onClick={onClick}
      className="card-hover bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 relative">
          {showImage ? (
            <img
              src={imageUrl}
              alt={profissional.nome}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {profissional.nome}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
            {profissional.cargo}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {profissional.resumo}
          </p>
          <div className="flex flex-wrap gap-2">
            {profissional.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {skill}
              </span>
            ))}
            {profissional.habilidadesTecnicas.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                +{profissional.habilidadesTecnicas.length - 3}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            📍 {profissional.localizacao}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalCard

