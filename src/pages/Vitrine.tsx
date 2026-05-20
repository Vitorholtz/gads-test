import { useAppStore } from '../store/useAppStore'
import MIcon from '../components/MIcon'

const CARDS = [
  {
    id: 'diarias',
    icon: 'calendar_today',
    title: 'Comprar Diárias',
    description: 'Exiba seu anúncio durante 24h em G1, GE, Globo.com, GloboPlay e Gshow. Escolha o portal, produto e datas ideais para sua campanha.',
    cta: 'Comprar',
    active: true,
    badge: null,
    portais: ['G1', 'GE', 'Globo.com', 'GloboPlay', 'Gshow'],
  },
  {
    id: 'pacotes',
    icon: 'inventory_2',
    title: 'Pacotes',
    description: 'Pacotes de anúncios com múltiplos formatos e maior alcance nos portais Globo.',
    cta: 'Em breve',
    active: false,
    badge: 'Em breve',
    portais: [],
  },
  {
    id: 'patrocinio',
    icon: 'workspace_premium',
    title: 'Patrocínios',
    description: 'Patrocine seções e conteúdos especiais dos portais Globo com alta visibilidade.',
    cta: 'Em breve',
    active: false,
    badge: 'Em breve',
    portais: [],
  },
  {
    id: 'programatica',
    icon: 'auto_awesome',
    title: 'Programática',
    description: 'Compra automatizada via leilão em tempo real com segmentação avançada.',
    cta: 'Em breve',
    active: false,
    badge: 'Em breve',
    portais: [],
  },
]

export default function Vitrine() {
  const { setActivePage } = useAppStore()

  return (
    <div className="p-8 max-w-5xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1">Vitrine</h1>
        <p className="text-sm text-gray-500">
          Escolha o produto ideal para exibir sua campanha nos portais Globo.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-5">
        {CARDS.map(({ id, icon, title, description, cta, active, badge, portais }) => (
          <div
            key={id}
            className={`relative flex flex-col p-6 rounded-xl border-2 transition-all ${
              active
                ? 'border-blue-100 bg-white hover:border-blue-300 hover:shadow-md cursor-default'
                : 'border-gray-100 bg-gray-50'
            }`}
          >
            {badge && (
              <span className="absolute top-4 right-4 text-[11px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">
                {badge}
              </span>
            )}

            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                active ? 'bg-blue-50' : 'bg-gray-100'
              }`}
            >
              <MIcon name={icon} size={22} className={active ? 'text-blue-600' : 'text-gray-400'} />
            </div>

            {/* Title */}
            <h2 className={`text-[15px] font-semibold mb-1.5 ${active ? 'text-gray-900' : 'text-gray-400'}`}>
              {title}
            </h2>

            {/* Description */}
            <p className={`text-sm flex-1 mb-4 leading-relaxed ${active ? 'text-gray-500' : 'text-gray-400'}`}>
              {description}
            </p>

            {/* Portal chips */}
            {portais.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {portais.map((p) => (
                  <span key={p} className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => active && setActivePage('Comprar Diárias')}
              disabled={!active}
              className={`self-start flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                active
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {active && <MIcon name="shopping_cart" size={16} />}
              {cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
