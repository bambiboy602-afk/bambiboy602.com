import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Sparkles,
  ShieldAlert,
  Activity,
  ArrowRight,
  RefreshCw,
  Compass,
  Layers,
  Sliders,
  CheckCircle2,
  Phone,
  MessageSquare,
  BookOpen,
  Terminal,
  Cpu,
} from 'lucide-react';
import { TOM_BOUNDARY_FAILURES } from '../data/tomRuntimeSpecification';

interface BambiLearnerSectionProps {
  onAskTom: (prompt: string) => void;
}

export const BambiLearnerSection: React.FC<BambiLearnerSectionProps> = ({ onAskTom }) => {
  const [activeTab, setActiveTab] = useState<'loop' | 'boundaries' | 'sandbox'>('loop');
  const [selectedBoundary, setSelectedBoundary] = useState<'relief' | 'meaning' | 'prediction' | 'connection' | 'identity'>('relief');
  const [activeLoopStep, setActiveLoopStep] = useState<number>(0);
  const [sandboxPrompt, setSandboxPrompt] = useState<string>('');

  const loopSteps = [
    {
      num: '01',
      title: 'Pressure Spikes',
      subtitle: 'Nervous System Acceleration',
      desc: 'Unaddressed tension, environmental friction, or sudden distress. The brain shifts from rational evaluation into survival urgency.',
      danger: 'Treating the emotional distress as an emergency requiring immediate anesthesia.',
      intervention: 'See → Sit → Move. Ground feet physically for 60 seconds before making any decision.',
      tomPrompt: 'Hey Tom, my pressure is spiking and my head is spinning. How do I slow this down right now?',
    },
    {
      num: '02',
      title: 'Default Action / Behavior',
      subtitle: 'Old Coping Pathways',
      desc: 'Reaching for old familiar escape routes: substances, phone shutdown, isolation, sudden explosive arguments, or disappearance.',
      danger: 'Believing the behavior is spontaneous, rather than the consequence of unspotted pressure.',
      intervention: 'Pause the hands. Name the pressure out loud before taking the next physical step.',
      tomPrompt: 'Hey Tom, I feel that old urge pulling hard right now. What got quieter the last time I slipped?',
    },
    {
      num: '03',
      title: 'Temporary Relief',
      subtitle: 'Short-Term Anesthesia',
      desc: 'The pain briefly quiets down. The brain mistakenly categorizes the behavior as a working solution, reinforcing the reflex loop.',
      danger: 'Confusing temporary numbness with actual safety or stabilization.',
      intervention: 'Recognize that relief has an expiration timestamp, and the debt will be collected shortly.',
      tomPrompt: 'Hey Tom, why does temporary relief feel like a solution even when I know the hangover or fallout is coming?',
    },
    {
      num: '04',
      title: 'Compounding Fallout',
      subtitle: 'Consequences & Regret',
      desc: 'Broken relationships, missed court dates, probation violations, lost housing beds, financial depletion, and heavy shame.',
      danger: 'Internalizing the consequence as permanent identity ("I am broken, I always ruin everything").',
      intervention: 'Separate the event from the identity. Failure is a historical event, not your birth name.',
      tomPrompt: 'Hey Tom, I messed up again and the guilt is crushing me. How do I drop this bag and face today?',
    },
    {
      num: '05',
      title: 'Awareness Interruption',
      subtitle: 'Spotting the Falling Tile',
      desc: 'Catching the chain reaction at step 1 or 2 before step 3 is reached. The pivotal milestone where recovery shifts from luck to skill.',
      danger: 'Trying to fix your entire life all at once instead of changing just one domino.',
      intervention: 'Pathway Domino Rule: Drop one intervention tile into the row to prevent the final domino from falling.',
      tomPrompt: 'Hey Tom, can you teach me how the Pathway Domino Effect game interrupts the chain before it tips?',
    },
    {
      num: '06',
      title: 'Micro-Stabilization',
      subtitle: 'Grounding & Next Degree',
      desc: 'Escorting the nervous system from survival orbit back to breathable human atmosphere, one small degree at a time.',
      danger: 'Forced toxic positivity or unrealistic promises to yourself that fail by tomorrow.',
      intervention: 'Do what is physically in front of you for the next 15 minutes. Call peer support. Eat something.',
      tomPrompt: 'Hey Tom, what is one realistic move I can make in the next 15 minutes to stay steady?',
    },
  ];

  const currentBoundaryData = TOM_BOUNDARY_FAILURES[selectedBoundary];

  const quickSandboxPrompts = [
    'Sudo Tom',
    'I feel like using right now',
    'I ruined everything, I am a failure',
    'I have an active warrant and I am scared',
    'Where can I get a bed tonight in Phoenix with no income?',
    'Tell me about the Pathway Domino Effect game',
  ];

  return (
    <section id="bambi-learner-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          <Brain className="w-3.5 h-3.5" />
          <span>Interactive Learner &amp; RSM Mapping Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-serif">
          The B.A.M.B.I. Recovery Loop &amp; Learner Lab
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Grounding peer support into actionable science. Explore the 6-stage behavioral loop, diagnose the 5 recursive boundary failures, or test custom AI Bot prompts directly against Tom’s native standalone runtime.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('loop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'loop'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>6-Stage Behavioral Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('boundaries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'boundaries'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>5 Boundary Failures (RSM)</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>New Bot &amp; Learner Sandbox</span>
          </button>
        </div>
      </div>

      {/* Tab 1: 6-Stage Behavioral Loop */}
      {activeTab === 'loop' && (
        <div className="space-y-6">
          {/* Step Selector Horizontal Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {loopSteps.map((step, idx) => {
              const isSelected = activeLoopStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveLoopStep(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-600 shadow-md scale-102'
                      : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1 opacity-80">
                    <span>STEP {step.num}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />}
                  </div>
                  <div className="font-bold text-xs truncate">{step.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Card for Selected Step */}
          {loopSteps[activeLoopStep] && (
            <motion.div
              key={activeLoopStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                    Stage {loopSteps[activeLoopStep].num} • {loopSteps[activeLoopStep].subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif mt-1">
                    {loopSteps[activeLoopStep].title}
                  </h3>
                </div>

                <button
                  onClick={() => onAskTom(loopSteps[activeLoopStep].tomPrompt)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all self-start md:self-auto shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Tom About Step {loopSteps[activeLoopStep].num}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    What Occurs
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {loopSteps[activeLoopStep].desc}
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>The Critical Danger</span>
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {loopSteps[activeLoopStep].danger}
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>The B.A.M.B.I. Intervention</span>
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {loopSteps[activeLoopStep].intervention}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Tab 2: 5 Boundary Failures (RSM) */}
      {activeTab === 'boundaries' && (
        <div className="space-y-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(['relief', 'meaning', 'prediction', 'connection', 'identity'] as const).map((key) => {
              const item = TOM_BOUNDARY_FAILURES[key];
              const isSelected = selectedBoundary === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedBoundary(key)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-600 shadow-md scale-102'
                      : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500'
                  }`}
                >
                  {item.category}
                </button>
              );
            })}
          </div>

          {/* Selected Boundary Failure Detail Card */}
          <motion.div
            key={selectedBoundary}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  RSM Diagnostic Boundary Layer
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif mt-0.5">
                  {currentBoundaryData.category}
                </h3>
              </div>

              <button
                onClick={() => onAskTom(`Hey Tom, let's explore ${currentBoundaryData.category}: ${currentBoundaryData.pattern}. ${currentBoundaryData.failureDescription}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all self-start md:self-auto shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk with Tom on this Boundary</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Mechanism &amp; Pattern
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-mono p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                  {currentBoundaryData.pattern} • {currentBoundaryData.examples.join(', ')}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  How This Boundary Fails
                </h4>
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed">
                  "{currentBoundaryData.failureDescription}"
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Tom Micro-Intervention
                </h4>
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-semibold leading-relaxed">
                  {currentBoundaryData.intervention}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tab 3: New Bot & Learner Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  Standalone Native Bot
                </span>
                <span className="text-xs text-stone-500 font-mono">v3.0 Core Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif mt-1">
                New AI Bot &amp; Learner Test Sandbox
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xl">
                Ready for your custom bot build and local computer workflow. Runs natively without any external GPT dependency, fully operational on GitHub Pages (bambiboy602.com) and in your local folder.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">Ready for Custom Model</span>
            </div>
          </div>

          {/* Quick Test Prompt Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Quick Test Prompts for Tom:
            </label>
            <div className="flex flex-wrap gap-2">
              {quickSandboxPrompts.map((promptText) => (
                <button
                  key={promptText}
                  onClick={() => onAskTom(promptText)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200 dark:border-stone-700 transition-colors text-left"
                >
                  "{promptText}"
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt Input */}
          <div className="pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (sandboxPrompt.trim()) {
                  onAskTom(sandboxPrompt.trim());
                  setSandboxPrompt('');
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Type a message or testing scenario for Tom's native engine..."
                value={sandboxPrompt}
                onChange={(e) => setSandboxPrompt(e.target.value)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!sandboxPrompt.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold shadow-md transition-all shrink-0"
              >
                Send to Tom
              </button>
            </form>
          </div>

          {/* Architecture Status Panel */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                <span>Local Computer &amp; GitHub Sync Specs</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">bambiboy602.com Ready</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              <strong>Local Path:</strong> <code className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 font-mono text-[11px]">C:\sync\Github\bambiboy602.com</code> • All files use normalized LF line endings with automatic Git push via GitHub Actions.
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              <strong>Fallback Engine:</strong> If running as a static export without Node on GitHub Pages, the client-side Tom brain engine handles speech, avatar lip-sync, and Arizona halfway house/crisis referrals offline.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
