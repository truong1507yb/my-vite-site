import './style.css';
import QRCode from 'qrcode';

// State management
const state = {
  image: null,           // Original Image Object
  imageName: '',         // Uploaded file name
  imageHash: null,       // SHA-256 hash of file
  logo: null,            // Logo Image Object
  logoName: '',          // Logo file name
  qrCodeImage: null,     // Generated QR Code Image Object
  
  // Watermark Settings
  watermarkType: 'text', // 'text' | 'logo'
  text: '© 2026 Anh Tin Cậy',
  fbName: 'Anh Tin Cậy',
  fbUrl: 'https://facebook.com',
  addVerified: true,
  addQr: true,
  addCardBg: true,
  
  logoAddQr: false,
  logoAddCardBg: true,
  
  // Text Styling
  font: 'Plus Jakarta Sans',
  color: '#ffffff',
  size: 32,             // Relative size (base 1200px image width)
  opacity: 80,          // 10-100%
  rotation: 0,          // Degrees -180 to 180
  
  // Logo Styling
  logoSize: 120,        // Relative size
  logoOpacity: 80,
  logoRotation: 0,
  
  // Layout
  position: 'br',       // tl, tc, tr, ml, cc, mr, bl, bc, br
  tiled: false,         // Repeating pattern grid
  
  // View Settings
  zoom: 'fit',          // 'fit' or number (0.5, 0.75, 1.0, etc.)
  activePreset: null,   // 'circular' | 'bar' | 'tile' | 'verified' | null
  
  // Export Settings
  exportFormat: 'original', // 'original', 'image/png', 'image/jpeg'
  exportQuality: 92
};

// Canvas references
const previewCanvas = document.getElementById('preview-canvas');
const offscreenCanvas = document.createElement('canvas');
const placeholder = document.getElementById('canvas-placeholder');
const scrollContainer = document.getElementById('canvas-scroll-container');

// Elements
const uploadZone = document.getElementById('upload-zone');
const imageInput = document.getElementById('image-input');
const uploadPreview = document.getElementById('upload-preview-container');
const fileNameDisplay = document.getElementById('file-name-display');
const btnRemoveImg = document.getElementById('btn-remove-img');

const fbNameInput = document.getElementById('fb-name-input');
const fbUrlInput = document.getElementById('fb-url-input');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabText = document.getElementById('tab-text');
const tabLogo = document.getElementById('tab-logo');

const watermarkTextInput = document.getElementById('watermark-text-input');
const addVerifiedCheckbox = document.getElementById('add-verified-badge');
const addQrCheckbox = document.getElementById('add-qr-badge');
const addCardBgCheckbox = document.getElementById('add-card-bg');

const logoUploadBox = document.getElementById('logo-upload-box');
const logoInput = document.getElementById('logo-input');
const logoPreview = document.getElementById('logo-preview-container');
const logoPreviewImg = document.getElementById('logo-preview-img');
const btnRemoveLogo = document.getElementById('btn-remove-logo');
const logoAddQrCheckbox = document.getElementById('logo-add-qr-badge');
const logoAddCardBgCheckbox = document.getElementById('logo-add-card-bg');

const fontSelect = document.getElementById('watermark-font');
const colorInput = document.getElementById('watermark-color');
const colorHexVal = document.getElementById('color-hex-val');

const textSizeSlider = document.getElementById('watermark-size-slider');
const textSizeVal = document.getElementById('text-size-val');
const textOpacitySlider = document.getElementById('watermark-opacity-slider');
const textOpacityVal = document.getElementById('text-opacity-val');
const textRotationSlider = document.getElementById('watermark-rotation-slider');
const textRotationVal = document.getElementById('text-rotation-val');

const logoSizeSlider = document.getElementById('logo-size-slider');
const logoSizeVal = document.getElementById('logo-size-val');
const logoOpacitySlider = document.getElementById('logo-opacity-slider');
const logoOpacityVal = document.getElementById('logo-opacity-val');
const logoRotationSlider = document.getElementById('logo-rotation-slider');
const logoRotationVal = document.getElementById('logo-rotation-val');

const posBtns = document.querySelectorAll('.pos-btn');
const tileToggle = document.getElementById('watermark-tile-toggle');

const btnCircular = document.getElementById('preset-circular');
const btnBar = document.getElementById('preset-bar');
const btnTile = document.getElementById('preset-tile');
const btnVerified = document.getElementById('preset-verified');

const btnZoomIn = document.getElementById('btn-zoom-in');
const btnZoomOut = document.getElementById('btn-zoom-out');
const btnFitScreen = document.getElementById('btn-fit-screen');
const zoomLevelVal = document.getElementById('zoom-level-val');

const exportFormatSelect = document.getElementById('export-format');
const jpegQualityWrapper = document.getElementById('jpeg-quality-wrapper');
const exportQualitySlider = document.getElementById('export-quality');
const qualityValDisplay = document.getElementById('quality-val-display');

const downloadBtn = document.getElementById('download-btn');
const btnCertificate = document.getElementById('btn-certificate');
const hashContainer = document.getElementById('hash-badge-container');
const imageHashVal = document.getElementById('image-hash-val');
const btnCopyHash = document.getElementById('btn-copy-hash');

const guideModal = document.getElementById('guide-modal');
const btnGuideTrigger = document.getElementById('btn-guide-trigger');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCloseModalOk = document.getElementById('btn-close-modal-ok');
const modalHashVal = document.getElementById('modal-hash-val');
const btnCopyModalHash = document.getElementById('btn-copy-modal-hash');

// Initialize Lucide Icons
lucide.createIcons();

// Helper: Calculate Cryptographic SHA-256 Hash of Image File
async function calculateSHA256(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (err) {
    console.error('Lỗi tính toán SHA-256 Hash:', err);
    return null;
  }
}

// Helper: Draw Verified Badge
function drawVerifiedBadge(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  
  // Blue badge container
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = '#1877f2';
  ctx.fill();
  
  // White checkmark
  ctx.beginPath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.13;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(-size * 0.18, 0);
  ctx.lineTo(-size * 0.04, size * 0.13);
  ctx.lineTo(size * 0.18, -size * 0.12);
  ctx.stroke();
  
  ctx.restore();
}

// Helper: Draw Glassmorphic Rounded Rect
function drawRoundedRect(ctx, rx, ry, rw, rh, radius, fill, stroke, strokeWidth) {
  ctx.beginPath();
  ctx.moveTo(rx + radius, ry);
  ctx.lineTo(rx + rw - radius, ry);
  ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
  ctx.lineTo(rx + rw, ry + rh - radius);
  ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
  ctx.lineTo(rx + radius, ry + rh);
  ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
  ctx.lineTo(rx, ry + radius);
  ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
  ctx.closePath();
  
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth || 1;
    ctx.stroke();
  }
}

// Helper: Draw Curved Text for Circular Stamp
function drawCurvedTextTop(ctx, text, cX, cY, radius, startAngle, scale) {
  ctx.save();
  ctx.fillStyle = state.color;
  ctx.font = `bold ${10.5 * scale}px "${state.font}"`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  
  const characters = text.split('');
  const totalAngle = characters.length * 0.095; // Spacing factor
  let currentAngle = startAngle - totalAngle / 2;
  
  for (let i = 0; i < characters.length; i++) {
    ctx.save();
    ctx.translate(cX, cY);
    ctx.rotate(currentAngle);
    ctx.fillText(characters[i], 0, -radius);
    ctx.restore();
    currentAngle += 0.095;
  }
  ctx.restore();
}

function drawCurvedTextBottom(ctx, text, cX, cY, radius, startAngle, scale) {
  ctx.save();
  ctx.fillStyle = state.color;
  ctx.font = `bold ${10.5 * scale}px "${state.font}"`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  
  const characters = text.split('');
  const totalAngle = characters.length * 0.12; // Wider spacing for bottom curve
  let currentAngle = startAngle + totalAngle / 2;
  
  for (let i = 0; i < characters.length; i++) {
    ctx.save();
    ctx.translate(cX, cY);
    ctx.rotate(currentAngle);
    // Draw letters facing upwards
    ctx.translate(0, radius);
    ctx.rotate(Math.PI);
    ctx.fillText(characters[i], 0, 0);
    ctx.restore();
    currentAngle -= 0.12;
  }
  ctx.restore();
}

// Dynamic QR Code generation
async function updateQRCode() {
  if (!state.fbUrl) {
    state.qrCodeImage = null;
    render();
    return;
  }
  try {
    const dataUrl = await QRCode.toDataURL(state.fbUrl, {
      margin: 1,
      width: 256,
      color: {
        dark: '#000000ff',
        light: '#ffffffff'
      }
    });
    const img = new Image();
    img.onload = () => {
      state.qrCodeImage = img;
      render();
    };
    img.src = dataUrl;
  } catch (err) {
    console.error('Lỗi tạo QR Code:', err);
    state.qrCodeImage = null;
    render();
  }
}

// Draw Watermark logic
function drawWatermark(ctx, imgW, imgH, scale) {
  // If Tiled Protection mode is enabled
  if (state.tiled) {
    ctx.save();
    const opacity = (state.watermarkType === 'text' ? state.opacity : state.logoOpacity) / 100;
    ctx.globalAlpha = opacity * 0.22; // low alpha for tiled pattern
    
    if (state.watermarkType === 'text') {
      const fontSize = state.size * scale;
      ctx.font = `bold ${fontSize}px "${state.font}"`;
      ctx.fillStyle = state.color;
      ctx.textBaseline = 'middle';
      const textWidth = ctx.measureText(state.text).width;
      
      const spacingX = textWidth * 1.5;
      const spacingY = fontSize * 3.5;
      
      ctx.translate(imgW / 2, imgH / 2);
      ctx.rotate(-30 * Math.PI / 180);
      
      const startX = -imgW * 1.5;
      const endX = imgW * 1.5;
      const startY = -imgH * 1.5;
      const endY = imgH * 1.5;
      
      for (let x = startX; x < endX; x += spacingX) {
        for (let y = startY; y < endY; y += spacingY) {
          ctx.fillText(state.text, x, y);
          if (state.addVerified) {
            drawVerifiedBadge(ctx, x + textWidth + (12 * scale), y, fontSize * 0.7);
          }
        }
      }
    } else if (state.watermarkType === 'logo' && state.logo) {
      const logoW = state.logoSize * scale * 0.5;
      const logoH = logoW * (state.logo.naturalHeight / state.logo.naturalWidth);
      
      const spacingX = logoW * 2.5;
      const spacingY = logoH * 2.5;
      
      ctx.translate(imgW / 2, imgH / 2);
      ctx.rotate(-30 * Math.PI / 180);
      
      const startX = -imgW * 1.5;
      const endX = imgW * 1.5;
      const startY = -imgH * 1.5;
      const endY = imgH * 1.5;
      
      for (let x = startX; x < endX; x += spacingX) {
        for (let y = startY; y < endY; y += spacingY) {
          ctx.drawImage(state.logo, x - logoW / 2, y - logoH / 2, logoW, logoH);
        }
      }
    }
    ctx.restore();
    return;
  }

  // Handle Custom Template: bottom bar
  if (state.activePreset === 'bar') {
    const barH = 75 * scale;
    ctx.save();
    ctx.globalAlpha = state.opacity / 100;
    
    // Draw bar background
    ctx.fillStyle = 'rgba(10, 15, 28, 0.85)';
    ctx.fillRect(0, imgH - barH, imgW, barH);
    
    // Top border line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(0, imgH - barH, imgW, 1.5 * scale);
    
    // Left text content
    const barFontSize = 22 * scale;
    ctx.font = `500 ${barFontSize}px "${state.font}"`;
    ctx.fillStyle = state.color;
    ctx.textBaseline = 'middle';
    ctx.fillText(state.text, 40 * scale, imgH - barH / 2);
    
    // Left blue checkmark
    if (state.addVerified) {
      const tWidth = ctx.measureText(state.text).width;
      drawVerifiedBadge(ctx, 40 * scale + tWidth + (12 * scale), imgH - barH / 2, barFontSize * 0.8);
    }
    
    // Right QR Code
    if (state.addQr && state.qrCodeImage) {
      const qrSz = 52 * scale;
      ctx.drawImage(state.qrCodeImage, imgW - qrSz - 40 * scale, imgH - barH / 2 - qrSz / 2, qrSz, qrSz);
    }
    ctx.restore();
    return;
  }

  // Handle Custom Template: Circular Seal
  if (state.activePreset === 'circular') {
    const R = 85 * scale;
    const margin = 40 * scale;
    let cX = imgW - R - margin;
    let cY = imgH - R - margin;
    
    // Position adjustments for circular stamp
    if (state.position === 'tl') { cX = R + margin; cY = R + margin; }
    else if (state.position === 'tc') { cX = imgW / 2; cY = R + margin; }
    else if (state.position === 'tr') { cX = imgW - R - margin; cY = R + margin; }
    else if (state.position === 'ml') { cX = R + margin; cY = imgH / 2; }
    else if (state.position === 'cc') { cX = imgW / 2; cY = imgH / 2; }
    else if (state.position === 'mr') { cX = imgW - R - margin; cY = imgH / 2; }
    else if (state.position === 'bl') { cX = R + margin; cY = imgH - R - margin; }
    else if (state.position === 'bc') { cX = imgW / 2; cY = imgH - R - margin; }
    
    ctx.save();
    ctx.globalAlpha = state.opacity / 100;
    
    // Rotate seal if needed
    ctx.translate(cX, cY);
    ctx.rotate(state.rotation * Math.PI / 180);
    ctx.translate(-cX, -cY);

    // Draw background glass circle
    ctx.beginPath();
    ctx.arc(cX, cY, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 15, 28, 0.7)';
    ctx.fill();
    ctx.strokeStyle = state.color;
    ctx.lineWidth = 2.5 * scale;
    ctx.stroke();

    // Draw inner circles
    ctx.beginPath();
    ctx.arc(cX, cY, R - 8 * scale, 0, Math.PI * 2);
    ctx.lineWidth = 1 * scale;
    ctx.stroke();
    
    // Outer text
    drawCurvedTextTop(ctx, "VERIFIED COPYRIGHT PROTECTION", cX, cY, R - 20 * scale, 0, scale);
    
    // Bottom text
    const labelBottom = state.fbName.toUpperCase() || "WATERMARK TRUST";
    drawCurvedTextBottom(ctx, `• ${labelBottom} •`, cX, cY, R - 20 * scale, Math.PI, scale);
    
    // Center element: QR Code or Verified Badge
    if (state.addQr && state.qrCodeImage) {
      const qrSz = 56 * scale;
      ctx.drawImage(state.qrCodeImage, cX - qrSz / 2, cY - qrSz / 2, qrSz, qrSz);
    } else {
      drawVerifiedBadge(ctx, cX, cY, 32 * scale);
    }
    
    ctx.restore();
    return;
  }

  // STANDARD MODES (Text & Logo watermarks, with card support)
  let blockW = 0;
  let blockH = 0;
  
  let leftW = 0;
  let leftH = 0;
  
  let qrW = 0;
  
  const fontSize = state.size * scale;
  const paddingX = (state.watermarkType === 'text' ? (state.addCardBg ? 20 : 0) : (state.logoAddCardBg ? 20 : 0)) * scale;
  const paddingY = (state.watermarkType === 'text' ? (state.addCardBg ? 16 : 0) : (state.logoAddCardBg ? 16 : 0)) * scale;
  const dividerW = (state.watermarkType === 'text' ? (state.addQr && state.qrCodeImage ? 24 : 0) : (state.logoAddQr && state.qrCodeImage ? 24 : 0)) * scale;

  // Calculate inner element widths
  if (state.watermarkType === 'text') {
    ctx.font = `bold ${fontSize}px "${state.font}"`;
    const textW = ctx.measureText(state.text).width;
    const badgeW = state.addVerified ? fontSize * 0.8 : 0;
    const badgeMargin = state.addVerified ? 8 * scale : 0;
    
    leftW = textW + badgeMargin + badgeW;
    leftH = fontSize;
    
    qrW = (state.addQr && state.qrCodeImage) ? fontSize * 2.2 : 0;
  } else {
    // Logo mode
    if (state.logo) {
      leftW = state.logoSize * scale;
      leftH = leftW * (state.logo.naturalHeight / state.logo.naturalWidth);
      
      qrW = (state.logoAddQr && state.qrCodeImage) ? leftW * 0.75 : 0;
    }
  }

  if (state.watermarkType === 'logo' && !state.logo) return; // Exit if no logo

  // Compute block size
  blockW = leftW + dividerW + qrW + paddingX * 2;
  blockH = Math.max(leftH, qrW) + paddingY * 2;

  // Position coordinates calculation
  const margin = 40 * scale;
  let bx = imgW - blockW - margin;
  let by = imgH - blockH - margin;

  switch (state.position) {
    case 'tl': bx = margin; by = margin; break;
    case 'tc': bx = (imgW - blockW) / 2; by = margin; break;
    case 'tr': bx = imgW - blockW - margin; by = margin; break;
    case 'ml': bx = margin; by = (imgH - blockH) / 2; break;
    case 'cc': bx = (imgW - blockW) / 2; by = (imgH - blockH) / 2; break;
    case 'mr': bx = imgW - blockW - margin; by = (imgH - blockH) / 2; break;
    case 'bl': bx = margin; by = imgH - blockH - margin; break;
    case 'bc': bx = (imgW - blockW) / 2; by = imgH - blockH - margin; break;
    case 'br': bx = imgW - blockW - margin; by = imgH - blockH - margin; break;
  }

  ctx.save();
  ctx.translate(bx, by);

  // Apply rotation from center of the block
  ctx.translate(blockW / 2, blockH / 2);
  const rotRad = (state.watermarkType === 'text' ? state.rotation : state.logoRotation) * Math.PI / 180;
  ctx.rotate(rotRad);
  ctx.translate(-blockW / 2, -blockH / 2);

  // Set opacity
  ctx.globalAlpha = (state.watermarkType === 'text' ? state.opacity : state.logoOpacity) / 100;

  // 1. Draw Card Background
  const cardEnabled = state.watermarkType === 'text' ? state.addCardBg : state.logoAddCardBg;
  if (cardEnabled) {
    drawRoundedRect(
      ctx, 
      0, 0, blockW, blockH, 
      12 * scale, 
      'rgba(11, 15, 27, 0.72)', 
      'rgba(255, 255, 255, 0.12)', 
      1.5 * scale
    );
  }

  // 2. Draw main text/logo content (left aligned inside paddings)
  const cy = blockH / 2;
  const leftX = paddingX;

  if (state.watermarkType === 'text') {
    ctx.fillStyle = state.color;
    ctx.font = `bold ${fontSize}px "${state.font}"`;
    ctx.textBaseline = 'middle';
    ctx.fillText(state.text, leftX, cy);
    
    // Draw blue checkmark
    if (state.addVerified) {
      const textW = ctx.measureText(state.text).width;
      const bSz = fontSize * 0.8;
      drawVerifiedBadge(ctx, leftX + textW + (8 * scale) + bSz / 2, cy, bSz);
    }
  } else if (state.watermarkType === 'logo' && state.logo) {
    ctx.drawImage(state.logo, leftX, cy - leftH / 2, leftW, leftH);
  }

  // 3. Draw Divider Line
  const hasQr = state.watermarkType === 'text' ? (state.addQr && state.qrCodeImage) : (state.logoAddQr && state.qrCodeImage);
  if (hasQr) {
    const dividerX = leftX + leftW + dividerW / 2;
    ctx.beginPath();
    ctx.moveTo(dividerX, paddingY);
    ctx.lineTo(dividerX, blockH - paddingY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1 * scale;
    ctx.stroke();
    
    // 4. Draw QR Code
    const qrX = leftX + leftW + dividerW;
    ctx.drawImage(state.qrCodeImage, qrX, cy - qrW / 2, qrW, qrW);
  }

  ctx.restore();
}

// Redraw / Render Canvas
function render() {
  if (!state.image) {
    // Hide canvas and show placeholder UI
    previewCanvas.style.display = 'none';
    placeholder.style.display = 'flex';
    downloadBtn.disabled = true;
    btnCertificate.disabled = true;
    hashContainer.classList.add('hidden');
    return;
  }
  
  // Show canvas and hide placeholder UI
  previewCanvas.style.display = 'block';
  placeholder.style.display = 'none';
  downloadBtn.disabled = false;
  
  const img = state.image;
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  
  // Setup offscreen canvas
  offscreenCanvas.width = w;
  offscreenCanvas.height = h;
  const ctx = offscreenCanvas.getContext('2d');
  
  // Draw base image
  ctx.drawImage(img, 0, 0, w, h);
  
  // Scale factor based on standard width 1200px
  const maxDim = Math.max(w, h);
  const scale = maxDim / 1200;
  
  // Draw watermark overlays
  drawWatermark(ctx, w, h, scale);
  
  // Draw scaled on preview canvas
  previewCanvas.width = w;
  previewCanvas.height = h;
  const pCtx = previewCanvas.getContext('2d');
  pCtx.drawImage(offscreenCanvas, 0, 0);
  
  applyZoom();
}

// Apply zoom styling on screen preview
function applyZoom() {
  if (!state.image) return;
  const rect = scrollContainer.getBoundingClientRect();
  const pad = 80;
  const containerW = rect.width - pad;
  const containerH = rect.height - pad;
  
  let currentZoom = state.zoom;
  
  if (state.zoom === 'fit') {
    const scaleX = containerW / state.image.naturalWidth;
    const scaleY = containerH / state.image.naturalHeight;
    currentZoom = Math.min(scaleX, scaleY, 1.0); // capped at 100% size
    zoomLevelVal.textContent = Math.round(currentZoom * 100) + '% (Tự động)';
  } else {
    zoomLevelVal.textContent = Math.round(state.zoom * 100) + '%';
  }
  
  previewCanvas.style.width = (state.image.naturalWidth * currentZoom) + 'px';
  previewCanvas.style.height = (state.image.naturalHeight * currentZoom) + 'px';
}

// Load Image File helper
function loadImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => callback(img);
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Setup Event Listeners

// 1. File Upload Handlers
uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      state.imageName = file.name;
      loadImage(file, async (img) => {
        state.image = img;
        fileNameDisplay.textContent = state.imageName;
        uploadZone.querySelector('.upload-content').classList.add('hidden');
        uploadPreview.classList.remove('hidden');
        
        // Calculate hash
        const hash = await calculateSHA256(file);
        state.imageHash = hash;
        if (hash) {
          imageHashVal.textContent = hash;
          modalHashVal.textContent = hash;
          hashContainer.classList.remove('hidden');
          btnCertificate.disabled = false;
        } else {
          hashContainer.classList.add('hidden');
          btnCertificate.disabled = true;
        }
        
        render();
      });
    }
  }
});

imageInput.addEventListener('change', (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    const file = files[0];
    state.imageName = file.name;
    loadImage(file, async (img) => {
      state.image = img;
      fileNameDisplay.textContent = state.imageName;
      uploadZone.querySelector('.upload-content').classList.add('hidden');
      uploadPreview.classList.remove('hidden');
      
      // Calculate hash
      const hash = await calculateSHA256(file);
      state.imageHash = hash;
      if (hash) {
        imageHashVal.textContent = hash;
        modalHashVal.textContent = hash;
        hashContainer.classList.remove('hidden');
        btnCertificate.disabled = false;
      } else {
        hashContainer.classList.add('hidden');
        btnCertificate.disabled = true;
      }
      
      render();
    });
  }
});

btnRemoveImg.addEventListener('click', (e) => {
  e.stopPropagation();
  state.image = null;
  state.imageName = '';
  state.imageHash = null;
  imageInput.value = '';
  uploadZone.querySelector('.upload-content').classList.remove('hidden');
  uploadPreview.classList.add('hidden');
  hashContainer.classList.add('hidden');
  btnCertificate.disabled = true;
  render();
});

// 2. Facebook Inputs
fbNameInput.addEventListener('input', (e) => {
  state.fbName = e.target.value;
  // If text watermark matches brand name, sync it
  if (watermarkTextInput.value === state.text) {
    state.text = `© 2026 ${state.fbName}`;
    watermarkTextInput.value = state.text;
  }
  render();
});

fbUrlInput.addEventListener('input', (e) => {
  state.fbUrl = e.target.value;
  updateQRCode();
});

// 3. Tab Switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const tabId = btn.getAttribute('data-tab');
    if (tabId === 'tab-text') {
      state.watermarkType = 'text';
      tabText.classList.remove('hidden');
      tabLogo.classList.add('hidden');
    } else {
      state.watermarkType = 'logo';
      tabText.classList.add('hidden');
      tabLogo.classList.remove('hidden');
    }
    render();
  });
});

// 4. Text Controls
watermarkTextInput.addEventListener('input', (e) => {
  state.text = e.target.value;
  state.activePreset = null; // Clear preset style on manual edits
  render();
});

addVerifiedCheckbox.addEventListener('change', (e) => {
  state.addVerified = e.target.checked;
  render();
});

addQrCheckbox.addEventListener('change', (e) => {
  state.addQr = e.target.checked;
  render();
});

addCardBgCheckbox.addEventListener('change', (e) => {
  state.addCardBg = e.target.checked;
  render();
});

fontSelect.addEventListener('change', (e) => {
  state.font = e.target.value;
  render();
});

colorInput.addEventListener('input', (e) => {
  state.color = e.target.value;
  colorHexVal.textContent = state.color;
  render();
});

textSizeSlider.addEventListener('input', (e) => {
  state.size = parseInt(e.target.value);
  textSizeVal.textContent = state.size + 'px';
  render();
});

textOpacitySlider.addEventListener('input', (e) => {
  state.opacity = parseInt(e.target.value);
  textOpacityVal.textContent = state.opacity + '%';
  render();
});

textRotationSlider.addEventListener('input', (e) => {
  state.rotation = parseInt(e.target.value);
  textRotationVal.textContent = state.rotation + '°';
  render();
});

// 5. Logo Controls
logoUploadBox.addEventListener('click', () => {
  if (!state.logo) {
    logoInput.click();
  }
});

logoInput.addEventListener('change', (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    const file = files[0];
    state.logoName = file.name;
    loadImage(file, (img) => {
      state.logo = img;
      logoPreviewImg.src = img.src;
      logoPreview.classList.remove('hidden');
      render();
    });
  }
});

btnRemoveLogo.addEventListener('click', (e) => {
  e.stopPropagation();
  state.logo = null;
  state.logoName = '';
  logoInput.value = '';
  logoPreview.classList.add('hidden');
  render();
});

logoAddQrCheckbox.addEventListener('change', (e) => {
  state.logoAddQr = e.target.checked;
  render();
});

logoAddCardBgCheckbox.addEventListener('change', (e) => {
  state.logoAddCardBg = e.target.checked;
  render();
});

logoSizeSlider.addEventListener('input', (e) => {
  state.logoSize = parseInt(e.target.value);
  logoSizeVal.textContent = state.logoSize + 'px';
  render();
});

logoOpacitySlider.addEventListener('input', (e) => {
  state.logoOpacity = parseInt(e.target.value);
  logoOpacityVal.textContent = state.logoOpacity + '%';
  render();
});

logoRotationSlider.addEventListener('input', (e) => {
  state.logoRotation = parseInt(e.target.value);
  logoRotationVal.textContent = state.logoRotation + '°';
  render();
});

// 6. Layout Position Buttons
posBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    posBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    state.position = btn.getAttribute('data-pos');
    state.tiled = false;
    tileToggle.checked = false;
    render();
  });
});

tileToggle.addEventListener('change', (e) => {
  state.tiled = e.target.checked;
  render();
});

// 7. Presets Trigger Buttons
btnCircular.addEventListener('click', () => {
  state.activePreset = 'circular';
  
  // Set tab to Text Watermark
  state.watermarkType = 'text';
  tabBtns[0].click();
  
  // Update state values for circular seal
  state.addVerified = false; // Checkmark is placed in the center manually
  state.addQr = true;        // Include QR Code in the center of seal
  state.opacity = 85;
  state.rotation = 0;
  state.tiled = false;
  
  // Sync inputs UI
  addVerifiedCheckbox.checked = false;
  addQrCheckbox.checked = true;
  textOpacitySlider.value = 85;
  textOpacityVal.textContent = '85%';
  textRotationSlider.value = 0;
  textRotationVal.textContent = '0°';
  tileToggle.checked = false;
  
  render();
});

btnBar.addEventListener('click', () => {
  state.activePreset = 'bar';
  
  // Set tab to Text Watermark
  state.watermarkType = 'text';
  tabBtns[0].click();
  
  // Bottom bar presets
  state.addVerified = true;
  state.addQr = true;
  state.opacity = 95;
  state.tiled = false;
  
  addVerifiedCheckbox.checked = true;
  addQrCheckbox.checked = true;
  textOpacitySlider.value = 95;
  textOpacityVal.textContent = '95%';
  tileToggle.checked = false;
  
  render();
});

btnTile.addEventListener('click', () => {
  state.activePreset = 'tile';
  state.tiled = true;
  tileToggle.checked = true;
  
  state.opacity = 20;
  textOpacitySlider.value = 20;
  textOpacityVal.textContent = '20%';
  
  render();
});

btnVerified.addEventListener('click', () => {
  state.activePreset = 'verified';
  
  // Standard text without QR and background card
  state.watermarkType = 'text';
  tabBtns[0].click();
  
  state.addVerified = true;
  state.addQr = false;
  state.addCardBg = false;
  state.opacity = 85;
  state.size = 28;
  state.tiled = false;
  state.position = 'br';
  
  // Update buttons
  posBtns.forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-pos') === 'br') b.classList.add('active');
  });
  
  addVerifiedCheckbox.checked = true;
  addQrCheckbox.checked = false;
  addCardBgCheckbox.checked = false;
  textOpacitySlider.value = 85;
  textOpacityVal.textContent = '85%';
  textSizeSlider.value = 28;
  textSizeVal.textContent = '28px';
  tileToggle.checked = false;
  
  render();
});

// 8. Zoom Controls
btnZoomIn.addEventListener('click', () => {
  if (state.zoom === 'fit') {
    state.zoom = 1.0;
  } else {
    state.zoom = Math.min(state.zoom + 0.15, 3.0);
  }
  applyZoom();
});

btnZoomOut.addEventListener('click', () => {
  if (state.zoom === 'fit') {
    state.zoom = 0.5;
  } else {
    state.zoom = Math.max(state.zoom - 0.15, 0.15);
  }
  applyZoom();
});

btnFitScreen.addEventListener('click', () => {
  state.zoom = 'fit';
  applyZoom();
});

window.addEventListener('resize', () => {
  if (state.zoom === 'fit') {
    applyZoom();
  }
});

// 9. Export & Download Handler
exportFormatSelect.addEventListener('change', (e) => {
  state.exportFormat = e.target.value;
  if (state.exportFormat === 'image/jpeg') {
    jpegQualityWrapper.classList.remove('hidden');
  } else {
    jpegQualityWrapper.classList.add('hidden');
  }
});

exportQualitySlider.addEventListener('input', (e) => {
  state.exportQuality = parseInt(e.target.value);
  qualityValDisplay.textContent = state.exportQuality + '%';
});

downloadBtn.addEventListener('click', () => {
  if (!state.image) return;
  
  // Find MIME type
  let format = state.exportFormat;
  if (format === 'original') {
    // Fallback to original, default to PNG or JPEG depending on file name
    const ext = state.imageName.split('.').pop().toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') {
      format = 'image/jpeg';
    } else {
      format = 'image/png';
    }
  }
  
  const quality = state.exportQuality / 100;
  
  // Download file trigger
  offscreenCanvas.toBlob((blob) => {
    if (!blob) return;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Create download file name
    const originalBaseName = state.imageName.substring(0, state.imageName.lastIndexOf('.')) || 'image';
    const ext = format === 'image/jpeg' ? 'jpg' : 'png';
    
    link.download = `${originalBaseName}_watermarked.${ext}`;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, format, quality);
});

// 10. Copy Hash Clipboard handler
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Đã sao chép mã SHA-256 đối chiếu vào bộ nhớ tạm!');
  }).catch(err => {
    console.error('Lỗi sao chép:', err);
  });
};

btnCopyHash.addEventListener('click', () => {
  if (state.imageHash) copyToClipboard(state.imageHash);
});

btnCopyModalHash.addEventListener('click', () => {
  if (state.imageHash) copyToClipboard(state.imageHash);
});

// 11. Modal Event Listeners
btnGuideTrigger.addEventListener('click', () => {
  guideModal.classList.remove('hidden');
});

const closeModal = () => {
  guideModal.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
btnCloseModalOk.addEventListener('click', closeModal);
guideModal.addEventListener('click', (e) => {
  if (e.target === guideModal) closeModal();
});

// 12. Download Certificate Document TXT
btnCertificate.addEventListener('click', () => {
  if (!state.image || !state.imageHash) return;
  
  const dateStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const content = `======================================================================
              GIẤY XÁC NHẬN BẢN QUYỀN HÌNH ẢNH KỸ THUẬT SỐ
                         (WATERMARK TRUST)
======================================================================

1. THÔNG TIN HÌNH ẢNH:
- Tên tệp ảnh gốc: ${state.imageName}
- Định dạng xuất: ${state.exportFormat === 'original' ? 'Giữ nguyên' : state.exportFormat}
- Mã khóa đối chiếu (SHA-256 Hash):
  ${state.imageHash}

2. THÔNG TIN CHỦ SỞ HỮU BẢN QUYỀN:
- Tên tác giả / Trang sở hữu: ${state.fbName}
- Đường dẫn Facebook Page xác thực: ${state.fbUrl}
- Thời gian đóng dấu xác thực: ${dateStr} (Giờ Việt Nam)

3. CHỮ KÝ SỐ XÁC NHẬN TRÊN CANVAS:
- Loại dấu: ${state.watermarkType === 'text' ? 'Đóng dấu chữ bản quyền' : 'Đóng dấu logo hình ảnh'}
- Định vị trí: ${state.position.toUpperCase()} ${state.tiled ? '(Lặp lại phủ kín ảnh)' : ''}
- Mã QR đính kèm: Có (Dẫn trực tiếp tới ${state.fbUrl})

======================================================================
HƯỚNG DẪN ĐĂNG KÝ BẢN QUYỀN ĐỂ ĐƯỢC FACEBOOK (META) TIN CẬY:

Hệ thống bảo vệ bản quyền của Facebook (Meta Rights Manager) tự động quét 
so khớp hình ảnh bằng vân tay kỹ thuật số. Để bảo vệ bức ảnh này:

Bước 1: Đăng ký quyền sử dụng Rights Manager
- Truy cập Business Suite (business.facebook.com) thuộc sở hữu Page của bạn.
- Vào mục "Rights Manager" (Trình quản lý bản quyền) và hoàn thành đơn đăng ký.

Bước 2: Tải lên tệp đối chiếu hình ảnh
- Khi được duyệt, tải ảnh đã được đóng dấu của bạn lên thư viện đối chiếu.
- Điền các thông tin chủ sở hữu (Page Name, Page URL) trùng khớp với
  thông tin đã ghi nhận trong Giấy chứng nhận này.

Bước 3: Giải trình khi có tranh chấp (Khiếu nại bản quyền)
- Mã SHA-256 Hash ở trên là bằng chứng không thể thay đổi về mặt toán học 
  rằng tệp ảnh của bạn đã được sở hữu từ ngày ${dateStr}.
- Nếu gặp trường hợp bên thứ ba báo cáo sai lệch hoặc tranh chấp bản quyền 
  với Facebook, hãy đính kèm tệp ảnh gốc cùng file Giấy chứng nhận (TXT) 
  này để bộ phận kiểm duyệt của Meta khôi phục lại quyền sở hữu cho bạn.

======================================================================
        Được tạo tự động bởi công cụ bản quyền Watermark Trust.
======================================================================`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const originalBaseName = state.imageName.substring(0, state.imageName.lastIndexOf('.')) || 'image';
  link.download = `${originalBaseName}_copyright_cert.txt`;
  link.href = url;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// Kickstart App QR Generation
updateQRCode();
