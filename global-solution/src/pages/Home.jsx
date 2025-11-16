import { useState, useMemo } from 'react'
import profissionaisData from '../data/profissionais.json'
import ProfessionalCard from '../components/ProfessionalCard'
import ProfessionalModal from '../components/ProfessionalModal'
import MessageModal from '../components/MessageModal'

function Home() {
  const [profissionais] = useState(profissionaisData)
  const [selectedProfissional, setSelectedProfissional] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageProfissional, setMessageProfissional] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterCidade, setFilterCidade] = useState('')
  const [filterTecnologia, setFilterTecnologia] = useState('')
  const [showNotification, setShowNotification] = useState({ type: '', message: '' })
  const [recommendedProfissionais, setRecommendedProfissionais] = useState(new Set())

  const areas = useMemo(() => {
    return [...new Set(profissionais.map(p => p.area))].sort()
  }, [profissionais])

  const cidades = useMemo(() => {
    return [...new Set(profissionais.map(p => p.localizacao))].sort()
  }, [profissionais])

  const tecnologias = useMemo(() => {
    const allTechs = profissionais.flatMap(p => p.habilidadesTecnicas)
    return [...new Set(allTechs)].sort()
  }, [profissionais])

  const filteredProfissionais = useMemo(() => {
    return profissionais.filter(prof => {
      const matchesSearch = 
        prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.resumo.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesArea = !filterArea || prof.area === filterArea
      const matchesCidade = !filterCidade || prof.localizacao === filterCidade
      const matchesTecnologia = 
        !filterTecnologia || 
        prof.habilidadesTecnicas.some(tech => 
          tech.toLowerCase().includes(filterTecnologia.toLowerCase())
        )

      return matchesSearch && matchesArea && matchesCidade && matchesTecnologia
    })
  }, [profissionais, searchTerm, filterArea, filterCidade, filterTecnologia])

  const handleCardClick = (profissional) => {
    setSelectedProfissional(profissional)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfissional(null)
  }

  const handleRecommend = (profissional) => {
    setRecommendedProfissionais(prev => new Set([...Array.from(prev), profissional.id]))
    setShowNotification({
      type: 'success',
      message: `Você recomendou ${profissional.nome}! ⭐`
    })
    setTimeout(() => setShowNotification({ type: '', message: '' }), 3000)
  }

  const handleSendMessage = (profissional) => {
    setMessageProfissional(profissional)
    setIsMessageModalOpen(true)
  }

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false)
    setMessageProfissional(null)
  }

  const handleSendMessageSubmit = (messageData) => {
    setShowNotification({
      type: 'success',
      message: `Mensagem enviada para ${messageData.to}! 💬`
    })
    setTimeout(() => setShowNotification({ type: '', message: '' }), 3000)
  }

  return (
    <div className="min-h-screen">
      {showNotification.message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
          showNotification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {showNotification.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Conecte-se com Profissionais
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore {profissionais.length} perfis profissionais e encontre o talento ideal
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">

        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por nome, cargo ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filterArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Área
            </label>
            <select
              id="filterArea"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todas as áreas</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filterCidade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cidade
            </label>
            <select
              id="filterCidade"
              value={filterCidade}
              onChange={(e) => setFilterCidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todas as cidades</option>
              {cidades.map(cidade => (
                <option key={cidade} value={cidade}>{cidade}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filterTecnologia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tecnologia
            </label>
            <select
              id="filterTecnologia"
              value={filterTecnologia}
              onChange={(e) => setFilterTecnologia(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todas as tecnologias</option>
              {tecnologias.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        </div>

        {(searchTerm || filterArea || filterCidade || filterTecnologia) && (
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterArea('')
              setFilterCidade('')
              setFilterTecnologia('')
            }}
            className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredProfissionais.length} profissional(is) encontrado(s)
        </p>
      </div>

      {filteredProfissionais.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfissionais.map(profissional => (
            <ProfessionalCard
              key={profissional.id}
              profissional={profissional}
              onClick={() => handleCardClick(profissional)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum profissional encontrado com os filtros selecionados.
          </p>
        </div>
      )}

      <ProfessionalModal
        profissional={selectedProfissional}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRecommend={handleRecommend}
        onSendMessage={handleSendMessage}
        isRecommended={selectedProfissional ? recommendedProfissionais.has(selectedProfissional.id) : false}
      />

      <MessageModal
        profissional={messageProfissional}
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        onSend={handleSendMessageSubmit}
      />
    </div>
  )
}

export default Home

