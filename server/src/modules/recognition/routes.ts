
import { Router } from 'express';
import multer from 'multer';
import { RecognitionService } from './service';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const router = Router();

router.post('/photo', authenticateToken, upload.single('image'), async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const detections = await RecognitionService.recognizeFood(
      req.file.buffer,
      req.file.originalname
    );

    res.json({ detections });
  } catch (error) {
    next(error);
  }
});

export { router as recognitionRoutes };
