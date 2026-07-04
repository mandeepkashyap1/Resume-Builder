const STORAGE_KEY = 'resumeBuilderData';

function loadThemeData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {};
}

function saveThemeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function applyTheme(data) {
  const preview = document.getElementById('resumePreview');
  if (!preview) return;
  preview.className = `resume-preview ${data.template || 'modern'}`;
  preview.style.setProperty('--resume-color', data.color || '#2563eb');
  preview.style.fontFamily = data.font || 'Inter, sans-serif';
  preview.style.minHeight = data.layout === 'multi' ? '1200px' : '980px';
}

function initThemeControls() {
  const data = loadThemeData();
  const templateSelect = document.getElementById('templateSelect');
  const accentColor = document.getElementById('accentColor');
  const fontSelect = document.getElementById('fontSelect');
  const layoutSelect = document.getElementById('layoutSelect');
  const themeToggle = document.getElementById('themeToggle');

  if (templateSelect) templateSelect.value = data.template || 'modern';
  if (accentColor) accentColor.value = data.color || '#2563eb';
  if (fontSelect) fontSelect.value = data.font || 'Inter, sans-serif';
  if (layoutSelect) layoutSelect.value = data.layout || 'single';

  [templateSelect, accentColor, fontSelect, layoutSelect].forEach((element) => {
    element?.addEventListener('change', () => {
      data.template = templateSelect?.value || 'modern';
      data.color = accentColor?.value || '#2563eb';
      data.font = fontSelect?.value || 'Inter, sans-serif';
      data.layout = layoutSelect?.value || 'single';
      saveThemeData(data);
      applyTheme(data);
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      data.darkMode = document.body.classList.contains('dark-mode');
      saveThemeData(data);
    });
  }

  applyTheme(data);
}

document.addEventListener('DOMContentLoaded', initThemeControls);
