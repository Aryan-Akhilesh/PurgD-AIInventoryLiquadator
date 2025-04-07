import { SpreadsheetUpload } from './components/SpreadsheetUpload';
import { Toaster } from 'sonner';
import { Sparkles, BarChart2, FileSpreadsheet } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-blue-600" />
                purgD
              </h1>
              <p className="text-gray-600 mt-1">AI-Powered Inventory Liquidation Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Upload</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BarChart2 className="w-5 h-5" />
                <span>Analyze</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="py-8">
        <SpreadsheetUpload />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 purgD. All rights reserved.</p>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
