import { Express } from 'express-serve-static-core';
import { User } from '../database/models';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
