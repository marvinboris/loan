import { Express } from 'express-serve-static-core';
import { User } from '../types/user';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}
