/**
 * Image Optimization Script for Omnia Construction Website
 *
 * This script optimizes all images in the public directory:
 * - Converts JPG/PNG to WebP format
 * - Compresses images for web performance
 * - Generates multiple sizes for responsive images
 * - Improves Core Web Vitals (LCP, CLS)
 *
 * Target: Reduce image sizes by 60-80% while maintaining quality
 *
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'gallery');

// Configuration
const CONFIG = {
  quality: 85, // WebP quality (0-100)
  jpegQuality: 90, // JPEG quality for fallback
  maxWidth: 1920, // Max width for large images
  thumbnailWidth: 400, // Width for thumbnails
  ogImageWidth: 1200, // Open Graph image width
  logoWidth: 500, // Logo width
};

// Statistics
const stats = {
  processed: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
};

/**
 * Convert and optimize a single image
 */
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const {
      width = CONFIG.maxWidth,
      quality = CONFIG.quality,
      format = 'webp',
    } = options;

    const inputStats = fs.statSync(inputPath);
    stats.originalSize += inputStats.size;

    let pipeline = sharp(inputPath);

    // Get image metadata
    const metadata = await pipeline.metadata();

    // Only resize if image is larger than target width
    if (metadata.width > width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Convert format
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality, effort: 6 });
    } else if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true });
    }

    // Save optimized image
    await pipeline.toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    stats.optimizedSize += outputStats.size;
    stats.processed++;

    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    console.log(
      `✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${reduction}% smaller)`
    );

    return {
      inputSize: inputStats.size,
      outputSize: outputStats.size,
      reduction,
    };
  } catch (error) {
    stats.errors++;
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Recursively find all images in a directory
 */
function findImages(dir, extensions = ['.jpg', '.jpeg', '.png']) {
  let results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(findImages(filePath, extensions));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  }

  return results;
}

/**
 * Optimize all gallery images
 */
async function optimizeGallery() {
  console.log('\n📸 Optimizing Gallery Images...\n');

  const images = findImages(GALLERY_DIR);

  if (images.length === 0) {
    console.log('No images found in gallery directory');
    return;
  }

  console.log(`Found ${images.length} images to optimize\n`);

  for (const imagePath of images) {
    const dir = path.dirname(imagePath);
    const ext = path.extname(imagePath);
    const basename = path.basename(imagePath, ext);

    // Create WebP version
    const webpPath = path.join(dir, `${basename}.webp`);
    await optimizeImage(imagePath, webpPath, {
      format: 'webp',
      quality: CONFIG.quality,
    });

    // Also optimize original JPEG (for fallback browsers)
    const optimizedJpegPath = path.join(dir, `${basename}-optimized.jpg`);
    await optimizeImage(imagePath, optimizedJpegPath, {
      format: 'jpeg',
      quality: CONFIG.jpegQuality,
    });
  }
}

/**
 * Optimize logo
 */
async function optimizeLogo() {
  console.log('\n🏢 Optimizing Logo...\n');

  const logoPath = path.join(PUBLIC_DIR, 'logo.jpg');

  if (!fs.existsSync(logoPath)) {
    console.log('logo.jpg not found');
    return;
  }

  // Create WebP version
  await optimizeImage(logoPath, path.join(PUBLIC_DIR, 'logo.webp'), {
    width: CONFIG.logoWidth,
    format: 'webp',
  });

  // Create optimized JPG version
  await optimizeImage(logoPath, path.join(PUBLIC_DIR, 'logo-optimized.jpg'), {
    width: CONFIG.logoWidth,
    format: 'jpeg',
  });
}

/**
 * Optimize Open Graph image
 */
async function optimizeOGImage() {
  console.log('\n🖼️  Optimizing Open Graph Image...\n');

  const ogImagePath = path.join(PUBLIC_DIR, 'og-image.png');

  if (!fs.existsSync(ogImagePath)) {
    console.log('og-image.png not found');
    return;
  }

  // Create WebP version (smaller file size)
  await optimizeImage(ogImagePath, path.join(PUBLIC_DIR, 'og-image.webp'), {
    width: CONFIG.ogImageWidth,
    format: 'webp',
    quality: 90, // Higher quality for social sharing
  });

  // Create optimized PNG version (fallback)
  await optimizeImage(ogImagePath, path.join(PUBLIC_DIR, 'og-image-optimized.png'), {
    width: CONFIG.ogImageWidth,
    format: 'jpeg', // Actually convert to JPEG for smaller size
    quality: 90,
  });

  // Rename optimized JPEG to PNG extension for compatibility
  const optimizedJpegPath = path.join(PUBLIC_DIR, 'og-image-optimized.png');
  const finalJpegPath = path.join(PUBLIC_DIR, 'og-image-optimized.jpg');
  if (fs.existsSync(optimizedJpegPath)) {
    fs.renameSync(optimizedJpegPath, finalJpegPath);
  }
}

/**
 * Print optimization statistics
 */
function printStats() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary');
  console.log('='.repeat(60));

  const originalMB = (stats.originalSize / 1024 / 1024).toFixed(2);
  const optimizedMB = (stats.optimizedSize / 1024 / 1024).toFixed(2);
  const savedMB = (originalMB - optimizedMB).toFixed(2);
  const reduction = ((1 - stats.optimizedSize / stats.originalSize) * 100).toFixed(1);

  console.log(`Images Processed: ${stats.processed}`);
  console.log(`Errors: ${stats.errors}`);
  console.log(`Original Size: ${originalMB} MB`);
  console.log(`Optimized Size: ${optimizedMB} MB`);
  console.log(`Space Saved: ${savedMB} MB (${reduction}% reduction)`);
  console.log('='.repeat(60) + '\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Image Optimization for Omnia Construction Website\n');
  console.log('Target: Minneapolis-St. Paul Metro, Minnesota\n');

  try {
    // Optimize in order
    await optimizeLogo();
    await optimizeOGImage();
    await optimizeGallery();

    // Print summary
    printStats();

    console.log('✅ Image optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Update image references in components to use .webp files');
    console.log('2. Add <picture> elements for WebP with JPEG fallback');
    console.log('3. Test Core Web Vitals in Chrome DevTools (LCP should improve)');
    console.log('4. Commit optimized images to git');
    console.log('5. Deploy to Vercel\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error during optimization:', error);
    process.exit(1);
  }
}

// Run main function
main();

export { optimizeImage, findImages };
