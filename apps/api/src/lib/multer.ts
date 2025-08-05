import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { config } from '../config';

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = config.uploadsPath;
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom unique pour le fichier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  // Accepter seulement les images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are accepted !'), false);
  }
};

// Configuration de multer
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
  fileFilter,
});

export const fileUrl = (req: Request) =>
  `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
