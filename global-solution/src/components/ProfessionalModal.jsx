import { useState, useEffect } from 'react'

function ProfessionalModal({ profissional, isOpen, onClose, onRecommend, onSendMessage, isRecommended }) {
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageError(false)
  }, [profissional?.id])

  if (!isOpen || !profissional) return null

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Perfil Profissional
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">

          <div className="flex items-start space-x-6 mb-6">
            <div className="flex-shrink-0 relative">
              {showImage ? (
                <img
                  src={imageUrl}
                  alt={profissional.nome}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {initials}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {profissional.nome}
              </h3>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-2">
                {profissional.cargo}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                📍 {profissional.localizacao} | 🏢 {profissional.area}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {profissional.resumo}
              </p>
            </div>
          </div>

          <section className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Habilidades Técnicas
            </h4>
            <div className="flex flex-wrap gap-2">
              {profissional.habilidadesTecnicas.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Soft Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {profissional.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Experiências Profissionais
            </h4>
            <div className="space-y-4">
              {profissional.experiencias.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {exp.cargo} - {exp.empresa}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.inicio} - {exp.fim}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    {exp.descricao}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Formação Acadêmica
            </h4>
            <div className="space-y-2">
              {profissional.formacao.map((form, index) => (
                <div key={index} className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium">{form.curso}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {form.instituicao} - {form.ano}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {profissional.projetos && profissional.projetos.length > 0 && (
            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Projetos
              </h4>
              <div className="space-y-3">
                {profissional.projetos.map((proj, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {proj.titulo} →
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {proj.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {profissional.certificacoes && profissional.certificacoes.length > 0 && (
            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Certificações
              </h4>
              <div className="flex flex-wrap gap-2">
                {profissional.certificacoes.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
                  >
                    🏆 {cert}
                  </span>
                ))}
              </div>
            </section>
          )}

          {profissional.idiomas && profissional.idiomas.length > 0 && (
            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Idiomas
              </h4>
              <div className="space-y-1">
                {profissional.idiomas.map((idioma, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300">
                    {idioma.idioma} - {idioma.nivel}
                  </p>
                ))}
              </div>
            </section>
          )}

          {profissional.areaInteresses && profissional.areaInteresses.length > 0 && (
            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Áreas de Interesse
              </h4>
              <div className="flex flex-wrap gap-2">
                {profissional.areaInteresses.map((interesse, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                  >
                    {interesse}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => !isRecommended && onRecommend(profissional)}
              disabled={isRecommended}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                isRecommended
                  ? 'bg-green-600 text-white cursor-default'
                  : 'btn-primary'
              }`}
            >
              {isRecommended ? '✓ Profissional Recomendado' : '⭐ Recomendar Profissional'}
            </button>
            <button
              onClick={() => onSendMessage(profissional)}
              className="btn-secondary flex-1"
            >
              💬 Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalModal

