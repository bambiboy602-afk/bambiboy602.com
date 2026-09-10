import React, { useState } from 'react';
import { ProductItem } from '../types';
import {
  Package,
  Check,
  Sparkles,
  Layers,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Shield,
  HelpCircle,
  Eye,
  FileText,
} from 'lucide-react';

interface ProductsSectionProps {
  products: ProductItem[];
  onAskAboutProduct: (product: ProductItem) => void;
  onOpenOrderModal: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAskAboutProduct,
  onOpenOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState<{ [productId: string]: 'overview' | 'specs' | 'preview' }>({
    'pathway-game': 'overview',
    'bambi-workbook': 'overview',
  });

  const [selectedPathwayTile, setSelectedPathwayTile] = useState<string>('Intervention');

  const pathwayTiles = [
    {
      category: 'Barrier',
      color: '#DC2626',
      bg: 'bg-red-50 dark:bg-red-950/40',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-400',
      examples: ['Stress', 'Poor Sleep', 'Financial Shock', 'Conflict'],
      desc: 'Obstacles or environmental pressures that destabilize emotional regulation and create vulnerability.',
    },
    {
      category: 'Awareness',
      color: '#2563EB',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-400',
      examples: ['Self Check', 'Pause', 'Notice Body Tension', 'Reality Check'],
      desc: 'Insight or realization that you are entering a danger zone before old autopilot takes over.',
    },
    {
      category: 'Mindset',
      color: '#7C3AED',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-700 dark:text-purple-400',
      examples: ['Nobody Cares', 'I Blew It Anyway', 'Just Once Won’t Hurt', 'I Can Handle It Alone'],
      desc: 'Self-talk and irrational core beliefs that justify continuing toward harmful actions.',
    },
    {
      category: 'Behavior',
      color: '#16A34A',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-700 dark:text-emerald-400',
      examples: ['Isolation', 'Lying', 'Skipping Work', 'Using / Relapse'],
      desc: 'The actions that perpetuate the domino cascade toward crisis or active addiction.',
    },
    {
      category: 'Intervention',
      color: '#EA580C',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-400',
      examples: ['Group Support', 'Ask For Help', 'Sponsor Call', 'Safe Space'],
      desc: 'The conscious choice that knocks the domino chain offline and changes the entire outcome!',
    },
  ];

  const workbookSessions = [
    { num: '1', title: 'Baseline & Awareness', focus: 'Measuring your current emotional and situational baseline without judgment.' },
    { num: '2', title: 'Pattern Mapping', focus: 'Tracing your repetitive loops: Trigger → Sensation → Thought → Reaction.' },
    { num: '3', title: 'The Backpack & Load', focus: 'Unpacking the heavy rocks (trauma, grief, shame) you’ve been carrying.' },
    { num: '4', title: 'Release Strategies', focus: 'Practical exercises to drop baggage that is no longer serving survival.' },
    { num: '5', title: 'Stabilization & The Reset', focus: 'Practicing the "See → Sit → Move" micro-intervention in real-time.' },
    { num: '6', title: 'Integration & New Baseline', focus: 'Establishing permanent healthy routines, boundaries, and peer support networks.' },
  ];

  return (
    <section id="products-for-sale" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
          <Package className="w-3.5 h-3.5" />
          <span>B.A.M.B.I. Products for Sale</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-serif">
          Tools for Real Recovery & Lasting Change
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Created by Bambi through real lived experience. Designed for individuals, treatment centers, sober living houses, and peer recovery groups.
        </p>
      </div>

      {/* 2 Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {products.map((product) => {
          const currentTab = activeTab[product.id] || 'overview';
          const isPathway = product.id === 'pathway-game';

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Product Visual Stage */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800 flex items-center justify-center p-3">
                <img
                  src={product.imageUrl}
                  onError={(e) => {
                    if (isPathway && !e.currentTarget.src.endsWith('/assets/pathway-box.svg')) {
                      e.currentTarget.src = '/assets/pathway-box.svg';
                    } else if (!isPathway && !e.currentTarget.src.endsWith('/assets/workbook-cover.svg')) {
                      e.currentTarget.src = '/assets/workbook-cover.svg';
                    }
                  }}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-md">
                    {product.badge}
                  </span>
                </div>

                {/* Price Pill Tag */}
                <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-lg text-right">
                  <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-1.5 text-xs text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    In Stock • Ships Fast
                  </span>
                </div>
              </div>

              {/* Product Information Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                    {product.subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                    {product.title}
                  </h3>

                  {/* Tabs: Overview vs Interactive Preview vs Specs */}
                  <div className="flex border-b border-stone-200 dark:border-stone-800 mt-4 mb-4 text-xs font-medium gap-2">
                    <button
                      onClick={() =>
                        setActiveTab((prev) => ({ ...prev, [product.id]: 'overview' }))
                      }
                      className={`pb-2 pr-3 transition-colors ${
                        currentTab === 'overview'
                          ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                      }`}
                    >
                      Overview & Value
                    </button>
                    <button
                      onClick={() =>
                        setActiveTab((prev) => ({ ...prev, [product.id]: 'preview' }))
                      }
                      className={`pb-2 px-3 transition-colors flex items-center gap-1 ${
                        currentTab === 'preview'
                          ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isPathway ? 'Domino Tiles' : '6 Sessions'}</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveTab((prev) => ({ ...prev, [product.id]: 'specs' }))
                      }
                      className={`pb-2 px-3 transition-colors ${
                        currentTab === 'specs'
                          ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                      }`}
                    >
                      Specs
                    </button>
                  </div>

                  {currentTab === 'overview' ? (
                    <div>
                      <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {product.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300"
                          >
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : currentTab === 'preview' ? (
                    <div className="mb-6">
                      {isPathway ? (
                        <div className="space-y-3">
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            Click a domino category to see how Pathway breaks the spiral:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                            {pathwayTiles.map((tile) => (
                              <button
                                key={tile.category}
                                onClick={() => setSelectedPathwayTile(tile.category)}
                                className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                                  selectedPathwayTile === tile.category
                                    ? `${tile.bg} ${tile.border} ${tile.text} ring-2 ring-emerald-500`
                                    : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                                }`}
                              >
                                {tile.category}
                              </button>
                            ))}
                          </div>
                          {(() => {
                            const selected = pathwayTiles.find((t) => t.category === selectedPathwayTile) || pathwayTiles[4];
                            return (
                              <div className={`p-3.5 rounded-2xl border ${selected.bg} ${selected.border} space-y-1.5`}>
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-xs font-bold ${selected.text}`}>
                                    {selected.category} Domino Tile
                                  </h4>
                                  <span className="text-[10px] font-mono text-stone-500">Pathway Category</span>
                                </div>
                                <p className="text-xs text-stone-700 dark:text-stone-300">
                                  {selected.desc}
                                </p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {selected.examples.map((ex, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-stone-900/80 text-[10px] font-semibold text-stone-800 dark:text-stone-200 border border-stone-200/50"
                                    >
                                      {ex}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            The 6-Session Behavioral Adaptation Path:
                          </p>
                          {workbookSessions.map((session) => (
                            <div
                              key={session.num}
                              className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs flex items-start gap-2.5"
                            >
                              <span className="w-5 h-5 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                                {session.num}
                              </span>
                              <div>
                                <h5 className="font-bold text-stone-900 dark:text-stone-100">
                                  {session.title}
                                </h5>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                  {session.focus}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6 space-y-2.5">
                      {product.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1 border-b border-stone-100 dark:border-stone-800"
                        >
                          <span className="text-stone-500 dark:text-stone-400">{spec.label}</span>
                          <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 text-xs text-stone-500">
                        <span>Format: </span>
                        <strong className="text-stone-800 dark:text-stone-200">{product.format}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onOpenOrderModal(product)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Order {product.price === 34 ? 'Game ($34)' : 'Workbook ($19)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAboutProduct(product)}
                    className="w-full sm:w-auto py-3 px-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-300 dark:border-stone-600 transition-all flex items-center justify-center gap-1.5"
                    title="Ask Tom AI about this product"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Ask Tom</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
