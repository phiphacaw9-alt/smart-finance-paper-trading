import { z } from 'zod';

// Auth validators
export const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Trade validators
export const CreateTradeSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  entryPrice: z.number().positive('Entry price must be positive'),
  quantity: z.number().positive('Quantity must be positive'),
  side: z.enum(['long', 'short']),
  stopLoss: z.number().positive().optional(),
  takeProfit: z.number().positive().optional(),
});

export const UpdateTradeSchema = z.object({
  exitPrice: z.number().positive('Exit price must be positive'),
});

// Strategy validators
export const CreateStrategySchema = z.object({
  name: z.string().min(1, 'Strategy name is required'),
  type: z.enum(['rsi', 'macd', 'bollinger', 'custom']),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateTradeInput = z.infer<typeof CreateTradeSchema>;
export type CreateStrategyInput = z.infer<typeof CreateStrategySchema>;
