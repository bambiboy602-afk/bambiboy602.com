import React, { useState } from 'react';
import { X, Check, Copy, Globe, Terminal, ShieldCheck, CheckCircle2, GitBranch, ArrowUpRight } from 'lucide-react';

interface GitHubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPublishModal: React.FC<GitHubPublishModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'deploy' | 'pages-setting' | 'local'>('pages-setting');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const stepsPush = [
    {
      title: "1. Link & Push to Your New Repository",
      desc: "In your project terminal, connect your code to your new GitHub repository URL and push:",
      command: `git remote remove origin\ngit remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO_NAME.git\ngit branch -M main\ngit add .\ngit commit -m "Deploy B.A.M.B.I. Peer Support to new repository"\ngit push -u origin main --force`,
    },
    {
      title: "2. Automatic Build File Already Included",
      desc: "The automated GitHub Actions workflow is saved in '.github/workflows/deploy.yml'. It will build the app whenever you push to main.",
      command: `git status`,
    },
  ];

  const stepsPages = [
    {
      title: "Step 1: Open Repository Settings on GitHub",
      desc: "Open your new repository page on GitHub.com and click the 'Settings' tab (gear icon at the top right of the repo).",
      command: `https://github.com/YOUR_USERNAME/YOUR_NEW_REPO_NAME/settings/pages`,
    },
    {
      title: "Step 2: Change Build & Deployment Source to 'GitHub Actions'",
      desc: "In the left sidebar, click 'Pages' (under Code and automation). Under 'Build and deployment' > 'Source', change the dropdown from 'Deploy from a branch' to 'GitHub Actions'. This is what triggers the automated build to run!",
      command: `Source: GitHub Actions`,
    },
    {
      title: "Step 3: Check the Actions Tab",
      desc: "Click the 'Actions' tab at the top of your repository. You will see 'Deploy to GitHub Pages' running. Once it shows a green checkmark, your site is officially running!",
      command: `https://github.com/YOUR_USERNAME/YOUR_NEW_REPO_NAME/actions`,
    },
    {
      title: "Step 4: Custom Domain (bambiboy602.com)",
      desc: "Under Settings > Pages > Custom domain, enter 'bambiboy602.com' and click Save. Check 'Enforce HTTPS'. (Make sure your DNS A-records point to GitHub Pages).",
      command: `# DNS A Records for @ (bambiboy602.com):\n185.199.108.153\n185.199.109.153\n185.199.110.153\n185.199.111.153\n\n# CNAME for www:\nwww -> YOUR_USERNAME.github.io`,
    },
  ];

  const stepsLocal = [
    {
      title: "1. Navigate to your local project directory",
      desc: "Open terminal or PowerShell on your computer:",
      command: `cd C:\\sync\\Github\\bambiboy602.com`,
    },
    {
      title: "2. Pull latest updates from GitHub",
      desc: "Fetch all updates, new docs, and standalone Tom Core Runtime:",
      command: `git pull origin main`,
    },
    {
      title: "3. Install dependencies & run dev server",
      desc: "Start the local server with full native Tom AI and B.A.M.B.I. Learner support:",
      command: `npm install\nnpm run dev`,
    },
    {
      title: "4. Open in Browser",
      desc: "Navigate to your local running app:",
      command: `http://localhost:3000`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 flex items-center justify-center font-mono font-bold text-sm">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Publish to GitHub & bambiboy602.com
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Production-ready repository configuration & custom domain setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">CNAME Ready</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">bambiboy602.com</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">GitHub Actions</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">deploy.yml wired</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Base Path Fixed</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">No blank screen</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 gap-1">
            <button
              onClick={() => setActiveTab('pages-setting')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pages-setting'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              1. Make New Repo Run (Pages Setting)
            </button>
            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'deploy'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              2. Push Code from Terminal
            </button>
            <button
              onClick={() => setActiveTab('local')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'local'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              3. Run Locally (Computer)
            </button>
          </div>

          {/* Step list depending on activeTab */}
          <div className="space-y-5">
            {(activeTab === 'pages-setting' ? stepsPages : activeTab === 'deploy' ? stepsPush : stepsLocal).map((step, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {step.title}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(step.command, idx)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
                <pre className="p-3 rounded-xl bg-stone-900 text-stone-200 text-xs font-mono overflow-x-auto border border-stone-800">
                  <code>{step.command}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Helper note */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <span>💡 Tip for GitHub Pages Settings:</span>
            </p>
            <p>
              In your GitHub repository, go to <strong>Settings &gt; Pages &gt; Build and deployment</strong>, set <strong>Source</strong> to <em>GitHub Actions</em>. Your custom domain <strong>bambiboy602.com</strong> will resolve with automatic HTTPS!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Domain: bambiboy602.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
