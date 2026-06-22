/* ==========================================================================
   КАМБАНИ ЗА МИР — forms.js
   Formspree AJAX submit за всички форми (registration, partner, participation)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const handleFormSubmit = (form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const btnText = submitBtn?.querySelector('.btn-text');
      const btnLoading = submitBtn?.querySelector('.btn-loading');
      const successMsg = form.querySelector('.form-success');
      const formGrid = form.querySelector('.form-grid');
      const formSubmit = form.querySelector('.form-submit');

      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (submitBtn) submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (formGrid) formGrid.style.display = 'none';
          if (formSubmit) formSubmit.style.display = 'none';
          const heading = form.querySelector('h3');
          if (heading) heading.style.display = 'none';
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            alert('Благодарим ви! Съобщението беше изпратено успешно.');
            form.reset();
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
        alert('Възникна грешка. Моля опитайте отново или ни пишете на info@peacehub.bg');
      }
    });
  };

  document.querySelectorAll('form[action*="formspree.io"]').forEach(handleFormSubmit);

});
