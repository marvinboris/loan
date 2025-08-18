// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { supabase } from '../lib';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId?: number;
      customerId?: number;
    };
    req.user = { id: decoded.userId || decoded.customerId };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

export const authorize = (
  role: 'admin' | 'telemarketer' | 'collector' | 'customer'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { data: user, error } =
      role === 'customer'
        ? await supabase
            .from('customers')
            .select('id')
            .eq('id', req.user.id)
            .maybeSingle()
        : await supabase
            .from('users')
            .select('role, groups:group_id (features)')
            .eq('id', req.user.id)
            .maybeSingle();

    if (
      error ||
      !user ||
      ('role' in user &&
        role !== user.role)
        // ||
        // !(
        //   user.role === 'admin' &&
        //   (req.path !== '/telemarketing/all-customers' ||
        //     !user.groups ||
        //     (user.groups?.features &&
        //       !(req.path.split('/')[1] in Object(user.groups.features))))
        // )
    ) {
      if ('groups' in user)
        console.log(req.path, req.path.split('/')[1], user.groups?.features);
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
};
