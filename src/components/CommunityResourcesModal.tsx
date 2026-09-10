import React, { useState } from 'react';
import {
  X,
  Home,
  Briefcase,
  HeartHandshake,
  Scale,
  FileText,
  Download,
  ExternalLink,
  Search,
  Phone,
  MapPin,
  CheckCircle2,
  Building2,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  HOUSING_RESOURCES,
  APPRENTICESHIP_RESOURCES,
  RecoveryHousingItem,
  ApprenticeshipItem,
} from '../data/communityResourcesData';

export type PillarTab = 'housing' | 'work' | 'treatment' | 'legal';

interface CommunityResourcesModalProps {
  isOpen: boolean;
  initialTab?: PillarTab;
  onClose: () => void;
  onOpenTomAI?: () => void;
}

export const CommunityResourcesModal: React.FC<CommunityResourcesModalProps> = ({
  isOpen,
  initialTab = 'housing',
  onClose,
  onOpenTomAI,
}) => {
  const [activeTab, setActiveTab] = useState<PillarTab>(initialTab);
  const [housingSearch, setHousingSearch] = useState('');
  const [housingFilter, setHousingFilter] = useState<'All' | 'Halfway House' | 'Emergency Shelter' | 'Residential / BHRF' | 'No Income'>('All');
  const [workSearch, setWorkSearch] = useState('');
  const [workOnlyAccepting, setWorkOnlyAccepting] = useState(false);
  const [showHowToGiveDocs, setShowHowToGiveDocs] = useState(false);

  // Sync tab if initialTab changes
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Filter Housing items
  const filteredHousing = HOUSING_RESOURCES.filter((item: RecoveryHousingItem) => {
    const matchesSearch =
      item.name.toLowerCase().includes(housingSearch.toLowerCase()) ||
      item.location.toLowerCase().includes(housingSearch.toLowerCase()) ||
      item.city.toLowerCase().includes(housingSearch.toLowerCase()) ||
      (item.contactNotes && item.contactNotes.toLowerCase().includes(housingSearch.toLowerCase()));

    if (housingFilter === 'No Income') {
      return matchesSearch && item.noIncomeRequired === true;
    }
    if (housingFilter !== 'All') {
      return matchesSearch && item.category === housingFilter;
    }
    return matchesSearch;
  });

  // Filter Apprenticeship items
  const filteredWork = APPRENTICESHIP_RESOURCES.filter((item: ApprenticeshipItem) => {
    const matchesSearch =
      item.occupation.toLowerCase().includes(workSearch.toLowerCase()) ||
      item.sponsorName.toLowerCase().includes(workSearch.toLowerCase()) ||
      item.sponsorCity.toLowerCase().includes(workSearch.toLowerCase()) ||
      item.sponsorCounty.toLowerCase().includes(workSearch.toLowerCase());

    if (workOnlyAccepting) {
      return matchesSearch && item.acceptingApplications;
    }
    return matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-stone-900 rounded-3xl max-w-4xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">
              {activeTab === 'housing' && <Home className="w-5 h-5" />}
              {activeTab === 'work' && <Briefcase className="w-5 h-5" />}
              {activeTab === 'treatment' && <HeartHandshake className="w-5 h-5" />}
              {activeTab === 'legal' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                4 Pillars of Direct Support
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Verified Community Directories & Direct Official PDF Documents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHowToGiveDocs(!showHowToGiveDocs)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
              title="How to manage documents"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>How Docs Work</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-950/40 p-1.5 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('housing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'housing'
                ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 shadow-sm border border-stone-200/80 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>1. Housing (2 PDFs)</span>
          </button>

          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'work'
                ? 'bg-white dark:bg-stone-800 text-amber-800 dark:text-amber-300 shadow-sm border border-stone-200/80 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>2. Work Resources (Apprenticeships)</span>
          </button>

          <button
            onClick={() => setActiveTab('treatment')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'treatment'
                ? 'bg-white dark:bg-stone-800 text-rose-800 dark:text-rose-300 shadow-sm border border-stone-200/80 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>3. Treatment</span>
          </button>

          <button
            onClick={() => setActiveTab('legal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'legal'
                ? 'bg-white dark:bg-stone-800 text-blue-800 dark:text-blue-300 shadow-sm border border-stone-200/80 dark:border-stone-700'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50'
            }`}
          >
            <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>4. Legal Help</span>
          </button>
        </div>

        {/* Optional Help Banner */}
        {showHowToGiveDocs && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">How Document Uploads Work:</p>
              <p className="text-[11px] leading-relaxed">
                All resource data from your uploaded PDFs is already fully digitized into this searchable directory so anyone on mobile or desktop can immediately search and call.
                To link the actual PDF files directly for 1-click download, place <strong>recoveryhomes.pdf</strong>, <strong>Comprehensive Recovery Directory V2.pdf</strong>, and <strong>Registered-Apprenticeship-Program-List.pdf</strong> into the <code>public/</code> folder using the AI Studio file explorer!
              </p>
            </div>
            <button
              onClick={() => setShowHowToGiveDocs(false)}
              className="ml-auto text-amber-600 hover:text-amber-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: HOUSING */}
          {activeTab === 'housing' && (
            <div className="space-y-6">
              {/* PDF Documents Download Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Doc 1: recoveryhomes.pdf */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between gap-3 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        Official Document 1
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        recoveryhomes.pdf
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                        Halfway House programs, low-barrier homes, emergency shelters & crisis respites.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="/recoveryhomes.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open / Download PDF</span>
                    </a>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      16 Pages
                    </span>
                  </div>
                </div>

                {/* Doc 2: Comprehensive Recovery Directory V2.pdf */}
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 flex flex-col justify-between gap-3 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-stone-700 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        Official Document 2
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        Comprehensive Recovery Directory V2.pdf
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                        Consolidated Arizona recovery facilities, halfway houses & behavioral services.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="/Comprehensive Recovery Directory V2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open / Download PDF</span>
                    </a>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      Consolidated Edition
                    </span>
                  </div>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search recovery homes by name, city, address, or keyword..."
                      value={housingSearch}
                      onChange={(e) => setHousingSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'No Income', 'Halfway House', 'Emergency Shelter', 'Residential / BHRF'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setHousingFilter(cat)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                          housingFilter === cat
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {cat === 'No Income' ? '✨ No Income Required' : cat}
                      </button>
                    )
                  )}
                  <span className="text-[11px] text-stone-400 ml-auto font-mono">
                    Showing {filteredHousing.length} locations
                  </span>
                </div>
              </div>

              {/* Housing List Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredHousing.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/60 transition-all space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                          {item.category}
                        </span>
                        {item.noIncomeRequired && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            No Income Req.
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                        {item.name}
                      </h4>
                      <div className="flex items-start gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
                        <span className="leading-tight">{item.location}</span>
                      </div>
                      {item.contactNotes && (
                        <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2 bg-stone-50 dark:bg-stone-900/60 p-2 rounded-xl border border-stone-100 dark:border-stone-800 leading-relaxed">
                          {item.contactNotes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-700/50">
                      {item.phone && (
                        <a
                          href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{item.phone}</span>
                        </a>
                      )}
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WORK RESOURCES (APPRENTICESHIPS) */}
          {activeTab === 'work' && (
            <div className="space-y-6">
              {/* Document Download Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Arizona Department of Economic Security
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      Registered-Apprenticeship-Program-List.pdf
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      44-page official directory of Arizona paid registered apprenticeships: Carpenters, Electricians, Plumbers, Mechanics, HVAC & more.
                    </p>
                  </div>
                </div>

                <a
                  href="/Registered-Apprenticeship-Program-List.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shrink-0 shadow-md active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full 44-Page PDF</span>
                </a>
              </div>

              {/* Search & Filter */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search trade (Carpenter, Electrician, HVAC, Plumber, Welder, Machinist)..."
                      value={workSearch}
                      onChange={(e) => setWorkSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <button
                    onClick={() => setWorkOnlyAccepting(!workOnlyAccepting)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-2 ${
                      workOnlyAccepting
                        ? 'bg-emerald-700 text-white border-emerald-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accepting Applications Only</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 px-1">
                  <span>Earn while you learn: Paid on-the-job training with full benefits and career credentials.</span>
                  <span className="font-mono font-bold">Showing {filteredWork.length} programs</span>
                </div>
              </div>

              {/* Apprenticeship Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredWork.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 shadow-xs flex flex-col justify-between hover:border-amber-500/60 transition-all space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                          {app.occupation}
                        </span>
                        {app.acceptingApplications ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            ✓ Accepting Now
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-500">
                            Check Sponsor
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {app.sponsorName}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                        <span>{app.sponsorCity}, {app.sponsorCounty}</span>
                      </div>

                      <div className="mt-2.5 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">How To Apply</p>
                        <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5 font-medium leading-relaxed">
                          {app.howToApply}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-700/50">
                      {app.phone && (
                        <a
                          href={`tel:${app.phone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{app.phone}</span>
                        </a>
                      )}
                      {app.linkOrEmail && (
                        <a
                          href={app.linkOrEmail}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs ml-auto"
                        >
                          <span>Apply / Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TREATMENT */}
          {activeTab === 'treatment' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-stone-50 dark:from-stone-900 dark:to-stone-950 border border-rose-200 dark:border-rose-900/60 space-y-6">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Pillar 3 • Recovery & Detox Pathways</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Compassionate Treatment Navigation
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Navigating intake, medically supervised detox, AHCCCS-funded 25-day beds, and intensive residential recovery can be overwhelming when you are in crisis. Bambi connects you directly with treatment centers without red tape or judgment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-2">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Direct Call / Text with Bambi
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Speak directly with a peer who has been through the fire and knows every access point in the Valley.
                  </p>
                  <a
                    href="tel:6027672147"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 602-767-2147</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-2">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    24/7 AI Peer Mentor (Tom)
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Need to talk through a craving, craving urge, or understand what detox intake looks like right now?
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTomAI?.();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Tom AI Chat</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEGAL HELP */}
          {activeTab === 'legal' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-stone-50 dark:from-stone-900 dark:to-stone-950 border border-blue-200 dark:border-blue-900/60 space-y-6">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Pillar 4 • Legal & Re-Entry Advocacy</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Get Your Legal Issues Right. Move Forward.
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Old warrants, court fines, suspended licenses, and missing identification keep good people trapped. B.A.M.B.I. helps you tackle obstacles step-by-step so you can obtain employment and stay free.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Step 1</span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">Warrant Quashing</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Navigating city and county walk-in warrant clinics without being taken into custody.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Step 2</span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">ID & Birth Certificates</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Fee waivers and agency assistance to secure official Arizona state IDs and vital records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Step 3</span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">Court Fines & License</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Enrolling in income-contingent community restitution and FARE debt resolution programs.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="tel:6027672147"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Bambi Direct (602-767-2147)</span>
                </a>
                <a
                  href="mailto:bambiboy602@gmail.com?subject=Legal%20Advocacy%20Help%20Request"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                >
                  <span>Email: bambiboy602@gmail.com</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>B.A.M.B.I. Peer Support • Phoenix, AZ • Phone: 602-767-2147</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
