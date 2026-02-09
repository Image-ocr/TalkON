import { Router } from 'express';
import multer from 'multer';
import { StorageService } from '../services/storage.service';
import { AuthRequest } from '../middleware/auth.middleware';
import sharp from 'sharp';

export const mediaRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

mediaRouter.post('/upload', upload.single('file'), async (req: AuthRequest, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    let buffer = req.file.buffer;
    const { mimetype, originalname } = req.file;

    // Optional image processing
    if (mimetype.startsWith('image/') && !mimetype.includes('gif')) {
      buffer = await sharp(buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    const { url, key } = await StorageService.getInstance().uploadFile(
      buffer,
      mimetype,
      originalname
    );

    res.json({
      success: true,
      data: {
        url,
        key,
        mimetype,
        size: buffer.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

mediaRouter.get('/download/:key', async (req: AuthRequest, res, next) => {
  try {
    const { key } = req.params;
    const url = await StorageService.getInstance().getDownloadUrl(key);
    res.json({ success: true, data: { url } });
  } catch (error) {
    next(error);
  }
});
