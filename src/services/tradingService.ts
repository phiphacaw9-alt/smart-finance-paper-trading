import { prisma } from '@/lib/prisma';

export interface CreateTradeInput {
  userId: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  tradeType: string;
  stopLoss?: number;
  takeProfit?: number;
}

export interface TradeStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnL: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
}

class TradingService {
  // Create new trade
  async createTrade(input: CreateTradeInput) {
    const trade = await prisma.trade.create({
      data: {
        userId: input.userId,
        symbol: input.symbol,
        quantity: input.quantity,
        entryPrice: input.entryPrice,
        tradeType: input.tradeType,
        stopLoss: input.stopLoss,
        takeProfit: input.takeProfit,
        status: 'OPEN',
        entryTime: new Date(),
      },
    });

    // Update user balance
    await this.updateUserBalance(input.userId, input);

    return trade;
  }

  // Close trade
  async closeTrade(tradeId: string, exitPrice: number, reason: string) {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
    });

    if (!trade) throw new Error('Trade not found');

    const pnl = this.calculatePnL(trade, exitPrice);

    const closedTrade = await prisma.trade.update({
      where: { id: tradeId },
      data: {
        exitPrice,
        exitTime: new Date(),
        pnl,
        status: 'CLOSED',
        closeReason: reason,
      },
    });

    // Update user balance with PnL
    await prisma.user.update({
      where: { id: trade.userId },
      data: {
        balance: {
          increment: pnl,
        },
      },
    });

    return closedTrade;
  }

  // Calculate PnL
  private calculatePnL(trade: any, exitPrice: number): number {
    const quantity = trade.quantity;
    const entryPrice = trade.entryPrice;

    if (trade.tradeType === 'LONG') {
      return (exitPrice - entryPrice) * quantity;
    } else {
      return (entryPrice - exitPrice) * quantity;
    }
  }

  // Get user trades
  async getUserTrades(userId: string, status?: string) {
    const where: any = { userId };
    if (status) {
      where.status = status;
    }
    return await prisma.trade.findMany({
      where,
      orderBy: { entryTime: 'desc' },
    });
  }

  // Get trading statistics
  async getTradeStats(userId: string): Promise<TradeStats> {
    const trades = await prisma.trade.findMany({
      where: {
        userId,
        status: 'CLOSED',
      },
    });

    if (trades.length === 0) {
      return {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        winRate: 0,
        totalPnL: 0,
        averageWin: 0,
        averageLoss: 0,
        profitFactor: 0,
      };
    }

    const winningTrades = trades.filter((t) => t.pnl! > 0);
    const losingTrades = trades.filter((t) => t.pnl! < 0);

    const totalWins = winningTrades.reduce((sum, t) => sum + t.pnl!, 0);
    const totalLosses = Math.abs(
      losingTrades.reduce((sum, t) => sum + t.pnl!, 0)
    );

    return {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: (winningTrades.length / trades.length) * 100,
      totalPnL: trades.reduce((sum, t) => sum + t.pnl!, 0),
      averageWin: totalWins / winningTrades.length || 0,
      averageLoss: totalLosses / losingTrades.length || 0,
      profitFactor: totalLosses > 0 ? totalWins / totalLosses : 0,
    };
  }

  // Update user balance
  private async updateUserBalance(userId: string, input: CreateTradeInput) {
    const cost = input.quantity * input.entryPrice;

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: cost,
        },
      },
    });
  }

  // Check stop loss and take profit
  async checkTradeConditions(tradeId: string, currentPrice: number) {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
    });

    if (!trade || trade.status === 'CLOSED') return;

    // Check stop loss
    if (trade.stopLoss) {
      if (
        (trade.tradeType === 'LONG' && currentPrice <= trade.stopLoss) ||
        (trade.tradeType === 'SHORT' && currentPrice >= trade.stopLoss)
      ) {
        await this.closeTrade(tradeId, currentPrice, 'STOP_LOSS');
        return;
      }
    }

    // Check take profit
    if (trade.takeProfit) {
      if (
        (trade.tradeType === 'LONG' && currentPrice >= trade.takeProfit) ||
        (trade.tradeType === 'SHORT' && currentPrice <= trade.takeProfit)
      ) {
        await this.closeTrade(tradeId, currentPrice, 'TAKE_PROFIT');
        return;
      }
    }
  }
}

export const tradingService = new TradingService();
