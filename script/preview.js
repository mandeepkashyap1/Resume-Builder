const STORAGE_KEY = 'resumeBuilderData';

function loadResumeData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {};
}

function renderResume(data) {
  const preview = document.getElementById('resumePreview');
  if (!preview) return;

  const template = data.template || 'modern';
  const accent = data.color || '#2563eb';
  const font = data.font || 'Inter, sans-serif';
  const layout = data.layout || 'single';

  preview.className = `resume-preview ${template}`;
  preview.style.setProperty('--resume-color', accent);
  preview.style.fontFamily = font;
  preview.style.minHeight = layout === 'multi' ? '1200px' : '980px';

  const summary = data.summary || 'A results-driven professional with a strong foundation in technology, communication, and problem-solving.';
  const educationMarkup = (data.education || []).filter(item => Object.values(item).some(Boolean)).map(item => `
    <div class="list-item">
      <strong>${item.degree || 'Degree'}</strong><br />
      <span class="muted">${item.college || 'College'} • ${item.university || 'University'}</span><br />
      <span class="muted">${item.start || ''}${item.start && item.end ? ' - ' : ''}${item.end || ''} • ${item.cgpa || ''}</span>
    </div>
  `).join('');

  const experienceMarkup = (data.experience || []).filter(item => Object.values(item).some(Boolean)).map(item => `
    <div class="list-item">
      <strong>${item.role || 'Role'}</strong><br />
      <span class="muted">${item.company || 'Company'} • ${item.start || ''}${item.start && item.end ? ' - ' : ''}${item.end || ''}</span>
      <div class="summary-text mt-2">${item.responsibilities || 'Responsibilities will appear here.'}</div>
    </div>
  `).join('');

  const projectsMarkup = (data.projects || []).filter(item => Object.values(item).some(Boolean)).map(item => `
    <div class="list-item">
      <strong>${item.name || 'Project Name'}</strong><br />
      <span class="muted">${item.duration || ''} • ${item.technologies || ''}</span>
      <div class="summary-text mt-2">${item.description || 'Project details will appear here.'}</div>
      ${item.github ? `<div class="muted small mt-1">GitHub: ${item.github}</div>` : ''}
    </div>
  `).join('');

  const skillsMarkup = [
    ...(data.technicalSkills || []),
    ...(data.softSkills || [])
  ].map(skill => `<span class="chip">${skill}</span>`).join('');

  const languagesMarkup = (data.languages || []).filter(item => item.name).map(item => `<div class="list-item"><strong>${item.name}</strong> <span class="muted">• ${item.level || 'Intermediate'}</span></div>`).join('');
  const hobbiesMarkup = (data.hobbies || []).map(item => `<span class="chip">${item}</span>`).join('');

  const initials = (data.fullName || 'JD').split(' ').map(name => name[0]).slice(0, 2).join('').toUpperCase();
  const profileMarkup = data.profilePhoto
    ? '<img src="' + data.profilePhoto + '" class="profile-image mb-3" alt="Profile" />'
    : '<div class="profile-image mb-3 d-flex align-items-center justify-content-center" style="background: rgba(37,99,235,0.12); color: var(--resume-color); font-weight: 700;">' + initials + '</div>';
  const linkedinMarkup = data.linkedin ? '<div class="contact-line">LinkedIn: ' + data.linkedin + '</div>' : '';
  const githubMarkup = data.github ? '<div class="contact-line">GitHub: ' + data.github + '</div>' : '';

  const certificationText = data.certifications?.[0]?.name ? data.certifications[0].name + ' • ' + (data.certifications[0].organization || '') : 'Add certifications';
  const achievementText = data.achievements?.awards ? 'Awards: ' + data.achievements.awards : '';

  preview.innerHTML = [
    '<div class="row g-4">',
    '  <div class="col-md-4">',
    '    ' + profileMarkup,
    '    <div class="name">' + (data.fullName || 'Your Name') + '</div>',
    '    <div class="title">' + (data.title || 'Professional Title') + '</div>',
    '    <div class="contact-line">' + (data.phone || 'Phone Number') + '</div>',
    '    <div class="contact-line">' + (data.email || 'Email Address') + '</div>',
    '    <div class="contact-line">' + (data.address || 'Address') + '</div>',
    '    ' + linkedinMarkup,
    '    ' + githubMarkup,
    '  </div>',
    '  <div class="col-md-8">',
    '    <div class="section-block">',
    '      <div class="heading">Profile</div>',
    '      <div class="summary-text">' + summary + '</div>',
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Skills</div>',
    '      <div>' + (skillsMarkup || '<span class="muted">Add technical and soft skills.</span>') + '</div>',
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Education</div>',
    '      ' + (educationMarkup || '<div class="muted">Add your education details.</div>'),
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Experience</div>',
    '      ' + (experienceMarkup || '<div class="muted">Add your work experience.</div>'),
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Projects</div>',
    '      ' + (projectsMarkup || '<div class="muted">Add your projects.</div>'),
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Certifications & Achievements</div>',
    '      <div class="summary-text">' + certificationText + '<br />' + achievementText + '</div>',
    '    </div>',
    '    <div class="section-block">',
    '      <div class="heading">Languages & Hobbies</div>',
    '      <div>' + (languagesMarkup || '<div class="muted">Add languages.</div>') + '</div>',
    '      <div class="mt-2">' + (hobbiesMarkup || '<span class="muted">Add hobbies.</span>') + '</div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');
}

function initPreview() {
  const data = loadResumeData();
  if (data.darkMode) document.body.classList.add('dark-mode');
  renderResume(data);
}

document.addEventListener('DOMContentLoaded', initPreview);
