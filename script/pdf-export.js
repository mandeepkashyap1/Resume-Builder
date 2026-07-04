document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('downloadPdfBtn');
  const preview = document.getElementById('resumePreview');

  if (!button || !preview) return;

  button.addEventListener('click', () => {
    if (typeof window.html2pdf !== 'function') {
      button.textContent = 'PDF library unavailable';
      return;
    }

    const options = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: 'resume-builder.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, allowTaint: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    button.textContent = 'Generating PDF...';
    button.disabled = true;

    const exportNode = preview.cloneNode(true);
    exportNode.style.width = '100%';
    exportNode.style.maxWidth = '100%';
    exportNode.style.minHeight = 'auto';
    exportNode.style.boxShadow = 'none';
    exportNode.style.background = '#ffffff';
    exportNode.style.padding = '24px';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '794px';
    wrapper.style.background = '#ffffff';
    wrapper.appendChild(exportNode);
    document.body.appendChild(wrapper);

    window.requestAnimationFrame(() => {
      window.html2pdf()
        .set(options)
        .from(exportNode)
        .save()
        .then(() => {
          wrapper.remove();
          button.textContent = 'Download PDF';
          button.disabled = false;
        })
        .catch(() => {
          wrapper.remove();
          button.textContent = 'Download PDF';
          button.disabled = false;
        });
    });
  });
});
