'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Trade {
  id: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  status: string;
  tradeType: string;
  entryTime: string;
  exitTime?: string;
}

interface TradeStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnL: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
}

export default function TradingDashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = 'user-id'; // Replace with actual user ID from auth

  useEffect(() => {
    fetchTrades();
    fetchStats();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await fetch(`/api/trades?userId=${userId}`);
      const data = await response.json();
      setTrades(data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/trades/stats?userId=${userId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Trading Dashboard</h1>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Trades</h3>
            <p className="text-2xl font-bold mt-2">{stats.totalTrades}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Win Rate</h3>
            <p className="text-2xl font-bold mt-2">{stats.winRate.toFixed(2)}%</p>
            <p className="text-sm text-gray-600 mt-1">
              {stats.winningTrades}W / {stats.losingTrades}L
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total PnL</h3>
            <p
              className={`text-2xl font-bold mt-2 ${
                stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(stats.totalPnL)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Profit Factor</h3>
            <p className="text-2xl font-bold mt-2">{stats.profitFactor.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Trades Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Symbol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Entry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Exit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">PnL</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Entry Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{trade.symbol}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.tradeType === 'LONG'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trade.tradeType}
                  </span>
                </td>
                <td className="px-6 py-3">{trade.quantity}</td>
                <td className="px-6 py-3">{formatCurrency(trade.entryPrice)}</td>
                <td className="px-6 py-3">
                  {trade.exitPrice ? formatCurrency(trade.exitPrice) : '-'}
                </td>
                <td
                  className={`px-6 py-3 font-semibold ${
                    trade.pnl && trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trade.pnl ? formatCurrency(trade.pnl) : '-'}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.status === 'OPEN'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {trade.status}
                  </span>
                </td>
                <td className="px-6 py-3">{formatDate(trade.entryTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
