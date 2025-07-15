import { Express } from 'express-serve-static-core';
import { User } from '../types/user';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
      file?: Multer.File;
      files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
    }
  }
}
