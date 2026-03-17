'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';

interface AIStatus {
  success: boolean;
  data: {
    openai: { success: boolean; message: string };
    perplexity: { success: boolean; message: string };
  };
}

export default function AIHealthPage() {
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/ai-health');
      setStatus(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect to backend';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
            AI Service Health Check
          </h1>
          <p className="text-gray-400">Verify your OpenAI and Perplexity API connections</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* OpenAI Card */}
          <div className="bg-[#111114] border border-[#F59E0B]/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-[#F59E0B]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B]">
                  ●
                </span>
                OpenAI
              </h2>
              {status?.data.openai.success ? (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 font-bold">Active</span>
              ) : (
                <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20 font-bold">Error</span>
              )}
            </div>
            
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Used for skill extraction, analysis summaries, and career matching recommendations.
            </p>

            <div className={`p-4 rounded-xl text-xs font-mono break-words border ${status?.data.openai.success ? 'bg-green-500/5 text-green-300 border-green-500/20' : 'bg-red-500/5 text-red-300 border-red-500/20'}`}>
              {loading ? 'Testing...' : status?.data.openai.message || 'Waiting for status...'}
            </div>
          </div>

          {/* Perplexity Card */}
          <div className="bg-[#111114] border border-[#F59E0B]/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-[#F59E0B]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center text-[#F59E0B]">
                  ✦
                </span>
                Perplexity
              </h2>
              {status?.data.perplexity.success ? (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 font-bold">Active</span>
              ) : (
                <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20 font-bold">Error</span>
              )}
            </div>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Used for real-time industry demand research and market trend analysis.
            </p>

            <div className={`p-4 rounded-xl text-xs font-mono break-words border ${status?.data.perplexity.success ? 'bg-green-500/5 text-green-300 border-green-500/20' : 'bg-red-500/5 text-red-300 border-red-500/20'}`}>
              {loading ? 'Testing...' : status?.data.perplexity.message || 'Waiting for status...'}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button 
            onClick={checkHealth}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            {loading ? 'Running Diagnostic...' : 'Re-Run Diagnostic'}
          </button>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <div className="text-gray-500 text-xs text-center max-w-md">
            Note: Your API keys are stored securely on the backend. This tool tests connectivity between your server and the AI providers.
          </div>
        </div>
      </div>
    </div>
  );
}
