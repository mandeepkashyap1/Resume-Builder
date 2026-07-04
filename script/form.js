const STORAGE_KEY = 'resumeBuilderData';
const defaultState = () => ({
  fullName: '',
  title: '',
  phone: '',
  email: '',
  address: '',
  linkedin: '',
  github: '',
  summary: '',
  profilePhoto: '',
  education: [{ degree: '', college: '', university: '', start: '', end: '', cgpa: '' }],
  technicalSkills: [],
  softSkills: [],
  projects: [{ name: '', description: '', technologies: '', github: '', duration: '' }],
  experience: [{ company: '', role: '', start: '', end: '', responsibilities: '' }],
  certifications: [{ name: '', organization: '', date: '' }],
  achievements: { awards: '', hackathons: '', competitions: '', olympiads: '' },
  languages: [{ name: '', level: 'Intermediate' }],
  hobbies: [],
  template: 'modern',
  color: '#2563eb',
  font: 'Inter, sans-serif',
  layout: 'single',
  darkMode: false
});

let state = defaultState();

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  state = saved ? { ...defaultState(), ...saved, achievements: { ...defaultState().achievements, ...(saved.achievements || {}) } } : defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateProgress() {
  const fields = [
    state.fullName,
    state.title,
    state.phone,
    state.email,
    state.summary,
    state.address,
    state.linkedin,
    state.github,
    state.education.some(item => Object.values(item).some(Boolean)),
    state.technicalSkills.length || state.softSkills.length,
    state.projects.some(item => Object.values(item).some(Boolean)),
    state.experience.some(item => Object.values(item).some(Boolean)),
    state.certifications.some(item => Object.values(item).some(Boolean)),
    state.achievements.awards || state.achievements.hackathons || state.achievements.competitions || state.achievements.olympiads,
    state.languages.some(item => Object.values(item).some(Boolean)),
    state.hobbies.length
  ];

  const complete = fields.filter(Boolean).length;
  const total = 13;
  const percent = Math.round((complete / total) * 100);
  const bar = document.getElementById('progressBar');
  const text = document.getElementById('progressText');
  if (bar) {
    bar.style.width = `${percent}%`;
    bar.className = `progress-bar ${percent > 70 ? 'bg-success' : percent > 40 ? 'bg-warning' : 'bg-primary'}`;
  }
  if (text) text.textContent = `${percent}% complete`;
}

function updateATS() {
  let score = 100;
  const suggestions = [];

  if (!state.email) {
    score -= 15;
    suggestions.push('Add your email address.');
  }
  if (!state.phone) {
    score -= 10;
    suggestions.push('Add your phone number.');
  }
  if (!state.summary || state.summary.length < 80) {
    score -= 10;
    suggestions.push('Strengthen your professional summary.');
  }
  if (!state.technicalSkills.length) {
    score -= 15;
    suggestions.push('Add more technical skills.');
  }
  if (!state.experience.some(item => item.company)) {
    score -= 15;
    suggestions.push('Add work experience details.');
  }
  if (!state.education.some(item => item.degree)) {
    score -= 10;
    suggestions.push('Add education details.');
  }
  if (!state.projects.some(item => item.description)) {
    score -= 10;
    suggestions.push('Add project descriptions.');
  }
  if (!state.languages.some(item => item.name)) {
    score -= 5;
    suggestions.push('Mention your languages.');
  }

  score = Math.max(0, score);
  const scoreEl = document.getElementById('atsScore');
  const suggestionsEl = document.getElementById('atsSuggestions');
  if (scoreEl) scoreEl.textContent = `${score}/100`;
  if (suggestionsEl) {
    suggestionsEl.innerHTML = suggestions.length ? suggestions.map(item => `<div class="mb-1">• ${item}</div>`).join('') : '<div class="text-success">Your resume looks strong. Keep refining it.</div>';
  }
}

function buildEducationMarkup(items) {
  return items.map((item, index) => `
    <div class="dynamic-item">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Education ${index + 1}</strong>
        <button type="button" class="btn btn-sm btn-outline-danger remove-item" data-section="education" data-index="${index}">Remove</button>
      </div>
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Degree Name</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="degree" value="${item.degree || ''}" /></div>
        <div class="col-md-6"><label class="form-label">College Name</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="college" value="${item.college || ''}" /></div>
        <div class="col-md-6"><label class="form-label">University Name</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="university" value="${item.university || ''}" /></div>
        <div class="col-md-3"><label class="form-label">Start Year</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="start" value="${item.start || ''}" /></div>
        <div class="col-md-3"><label class="form-label">End Year</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="end" value="${item.end || ''}" /></div>
        <div class="col-md-12"><label class="form-label">CGPA / Percentage</label><input class="form-control education-input" data-section="education" data-index="${index}" data-key="cgpa" value="${item.cgpa || ''}" /></div>
      </div>
    </div>
  `).join('');
}

function buildProjectMarkup(items) {
  return items.map((item, index) => `
    <div class="dynamic-item">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Project ${index + 1}</strong>
        <button type="button" class="btn btn-sm btn-outline-danger remove-item" data-section="projects" data-index="${index}">Remove</button>
      </div>
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Project Name</label><input class="form-control project-input" data-section="projects" data-index="${index}" data-key="name" value="${item.name || ''}" /></div>
        <div class="col-md-6"><label class="form-label">Duration</label><input class="form-control project-input" data-section="projects" data-index="${index}" data-key="duration" value="${item.duration || ''}" /></div>
        <div class="col-md-12"><label class="form-label">Description</label><textarea class="form-control project-input" data-section="projects" data-index="${index}" data-key="description" rows="3">${item.description || ''}</textarea></div>
        <div class="col-md-6"><label class="form-label">Technologies Used</label><input class="form-control project-input" data-section="projects" data-index="${index}" data-key="technologies" value="${item.technologies || ''}" /></div>
        <div class="col-md-6"><label class="form-label">GitHub Link</label><input class="form-control project-input" data-section="projects" data-index="${index}" data-key="github" value="${item.github || ''}" /></div>
      </div>
    </div>
  `).join('');
}

function buildExperienceMarkup(items) {
  return items.map((item, index) => `
    <div class="dynamic-item">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Experience ${index + 1}</strong>
        <button type="button" class="btn btn-sm btn-outline-danger remove-item" data-section="experience" data-index="${index}">Remove</button>
      </div>
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Company Name</label><input class="form-control experience-input" data-section="experience" data-index="${index}" data-key="company" value="${item.company || ''}" /></div>
        <div class="col-md-6"><label class="form-label">Role</label><input class="form-control experience-input" data-section="experience" data-index="${index}" data-key="role" value="${item.role || ''}" /></div>
        <div class="col-md-6"><label class="form-label">Start Date</label><input class="form-control experience-input" data-section="experience" data-index="${index}" data-key="start" value="${item.start || ''}" /></div>
        <div class="col-md-6"><label class="form-label">End Date</label><input class="form-control experience-input" data-section="experience" data-index="${index}" data-key="end" value="${item.end || ''}" /></div>
        <div class="col-md-12"><label class="form-label">Responsibilities</label><textarea class="form-control experience-input" data-section="experience" data-index="${index}" data-key="responsibilities" rows="3">${item.responsibilities || ''}</textarea></div>
      </div>
    </div>
  `).join('');
}

function buildLanguageMarkup(items) {
  return items.map((item, index) => `
    <div class="dynamic-item">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <strong>Language ${index + 1}</strong>
        <button type="button" class="btn btn-sm btn-outline-danger remove-item" data-section="languages" data-index="${index}">Remove</button>
      </div>
      <div class="row g-3">
        <div class="col-md-8"><label class="form-label">Language Name</label><input class="form-control language-input" data-section="languages" data-index="${index}" data-key="name" value="${item.name || ''}" /></div>
        <div class="col-md-4"><label class="form-label">Level</label><select class="form-select language-input" data-section="languages" data-index="${index}" data-key="level"><option value="Beginner" ${item.level === 'Beginner' ? 'selected' : ''}>Beginner</option><option value="Intermediate" ${item.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option><option value="Fluent" ${item.level === 'Fluent' ? 'selected' : ''}>Fluent</option></select></div>
      </div>
    </div>
  `).join('');
}

function renderTags(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.length ? items.map((item, index) => `<span class="tag me-2 mb-2 d-inline-block">${item}<button type="button" class="btn btn-close btn-close-sm ms-2" data-section="${containerId}" data-index="${index}"></button></span>`).join('') : '<span class="text-muted small">No items yet.</span>';
}

function renderDynamicSections() {
  document.getElementById('educationList').innerHTML = buildEducationMarkup(state.education);
  document.getElementById('projectList').innerHTML = buildProjectMarkup(state.projects);
  document.getElementById('experienceList').innerHTML = buildExperienceMarkup(state.experience);
  document.getElementById('languageList').innerHTML = buildLanguageMarkup(state.languages);
  renderTags('technicalSkillTags', state.technicalSkills);
  renderTags('softSkillTags', state.softSkills);
  renderTags('hobbyTags', state.hobbies);
}

function populateForm() {
  document.getElementById('fullName').value = state.fullName;
  document.getElementById('title').value = state.title;
  document.getElementById('phone').value = state.phone;
  document.getElementById('email').value = state.email;
  document.getElementById('address').value = state.address;
  document.getElementById('linkedin').value = state.linkedin;
  document.getElementById('github').value = state.github;
  document.getElementById('summary').value = state.summary;
  document.getElementById('certName').value = state.certifications[0]?.name || '';
  document.getElementById('certOrg').value = state.certifications[0]?.organization || '';
  document.getElementById('certDate').value = state.certifications[0]?.date || '';
  document.getElementById('awards').value = state.achievements.awards || '';
  document.getElementById('hackathons').value = state.achievements.hackathons || '';
  document.getElementById('competitions').value = state.achievements.competitions || '';
  document.getElementById('olympiads').value = state.achievements.olympiads || '';
  document.getElementById('summaryCounter').textContent = `${state.summary.length}/300`;
  renderDynamicSections();
  updateProgress();
  updateATS();
}

function collectState() {
  state.fullName = document.getElementById('fullName').value.trim();
  state.title = document.getElementById('title').value.trim();
  state.phone = document.getElementById('phone').value.trim();
  state.email = document.getElementById('email').value.trim();
  state.address = document.getElementById('address').value.trim();
  state.linkedin = document.getElementById('linkedin').value.trim();
  state.github = document.getElementById('github').value.trim();
  state.summary = document.getElementById('summary').value.trim();
  state.certifications[0] = {
    name: document.getElementById('certName').value.trim(),
    organization: document.getElementById('certOrg').value.trim(),
    date: document.getElementById('certDate').value
  };
  state.achievements = {
    awards: document.getElementById('awards').value.trim(),
    hackathons: document.getElementById('hackathons').value.trim(),
    competitions: document.getElementById('competitions').value.trim(),
    olympiads: document.getElementById('olympiads').value.trim()
  };
  saveState();
}

function syncDynamicField(target) {
  if (!target.dataset.section || !target.dataset.index || !target.dataset.key) return;
  const section = target.dataset.section;
  const index = Number(target.dataset.index);
  const key = target.dataset.key;
  if (!state[section] || !state[section][index]) return;
  if (target.type === 'checkbox') {
    state[section][index][key] = target.checked;
  } else {
    state[section][index][key] = target.value;
  }
  saveState();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.profilePhoto = reader.result;
    saveState();
  };
  reader.readAsDataURL(file);
}

function addSectionItem(section) {
  if (section === 'education') state.education.push({ degree: '', college: '', university: '', start: '', end: '', cgpa: '' });
  if (section === 'projects') state.projects.push({ name: '', description: '', technologies: '', github: '', duration: '' });
  if (section === 'experience') state.experience.push({ company: '', role: '', start: '', end: '', responsibilities: '' });
  if (section === 'languages') state.languages.push({ name: '', level: 'Intermediate' });
  renderDynamicSections();
  saveState();
}

function removeSectionItem(section, index) {
  if (section === 'education') state.education.splice(index, 1);
  if (section === 'projects') state.projects.splice(index, 1);
  if (section === 'experience') state.experience.splice(index, 1);
  if (section === 'languages') state.languages.splice(index, 1);
  if (state[section] && state[section].length === 0) {
    addSectionItem(section);
  }
  renderDynamicSections();
  saveState();
}

function addSkill(type) {
  const inputId = type === 'technical' ? 'technicalSkillInput' : 'softSkillInput';
  const value = document.getElementById(inputId).value.trim();
  if (!value) return;
  if (type === 'technical') state.technicalSkills.push(value);
  if (type === 'soft') state.softSkills.push(value);
  document.getElementById(inputId).value = '';
  renderDynamicSections();
  saveState();
}

function removeSkill(section, index) {
  if (section === 'technicalSkillTags') state.technicalSkills.splice(index, 1);
  if (section === 'softSkillTags') state.softSkills.splice(index, 1);
  if (section === 'hobbyTags') state.hobbies.splice(index, 1);
  renderDynamicSections();
  saveState();
}

function addHobby() {
  const input = document.getElementById('hobbyInput');
  const value = input.value.trim();
  if (!value) return;
  state.hobbies.push(value);
  input.value = '';
  renderDynamicSections();
  saveState();
}

function attachEvents() {
  document.getElementById('summary').addEventListener('input', () => {
    document.getElementById('summaryCounter').textContent = `${document.getElementById('summary').value.length}/300`;
    collectState();
    updateProgress();
    updateATS();
  });

  document.getElementById('resumeForm').addEventListener('input', (event) => {
    if (event.target.matches('input, textarea, select')) {
      syncDynamicField(event.target);
      collectState();
      updateProgress();
      updateATS();
    }
  });

  document.getElementById('resumeForm').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button?.id === 'addEducation') addSectionItem('education');
    if (button?.id === 'addProject') addSectionItem('projects');
    if (button?.id === 'addExperience') addSectionItem('experience');
    if (button?.id === 'addLanguage') addSectionItem('languages');
    if (button?.id === 'addTechnicalSkill') addSkill('technical');
    if (button?.id === 'addSoftSkill') addSkill('soft');
    if (button?.id === 'addHobby') addHobby();
    if (button?.classList.contains('remove-item')) removeSectionItem(button.dataset.section, Number(button.dataset.index));
    if (event.target.classList.contains('btn-close')) removeSkill(event.target.parentElement.dataset.section, Number(event.target.parentElement.dataset.index));
  });

  document.getElementById('resumeForm').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.id === 'technicalSkillInput') {
      event.preventDefault();
      addSkill('technical');
    }
    if (event.key === 'Enter' && event.target.id === 'softSkillInput') {
      event.preventDefault();
      addSkill('soft');
    }
    if (event.key === 'Enter' && event.target.id === 'hobbyInput') {
      event.preventDefault();
      addHobby();
    }
  });

  document.getElementById('photoInput').addEventListener('change', handlePhotoUpload);
  document.getElementById('savePreviewBtn').addEventListener('click', () => {
    collectState();
    window.location.href = 'preview.html';
  });
  document.getElementById('downloadBtn').addEventListener('click', () => {
    window.location.href = 'preview.html';
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    state.darkMode = document.body.classList.contains('dark-mode');
    saveState();
  });
}

function initBuilder() {
  loadState();
  if (state.darkMode) document.body.classList.add('dark-mode');
  populateForm();
  attachEvents();
}

document.addEventListener('DOMContentLoaded', initBuilder);
