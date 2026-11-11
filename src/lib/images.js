/** Downscale uploaded photos so several listings fit inside localStorage. */

const MAX_WIDTH = 1280;
const QUALITY = 0.78;

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('That file is not a valid image.'));
    image.src = src;
  });
}

export async function compressImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error(`${file.name} is not an image file.`);
  }
  const original = await readFile(file);
  const image = await loadImage(original);
  if (!image.width || !image.height) throw new Error(`${file.name} could not be decoded.`);

  const scale = Math.min(1, MAX_WIDTH / image.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', QUALITY);
}

export async function compressImages(files, max = 6) {
  const list = Array.from(files).slice(0, max);
  const results = [];
  for (const file of list) {
    results.push(await compressImage(file));
  }
  return results;
}
