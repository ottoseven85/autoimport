
document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // PHONE MASK (ГРУЗІЯ +995 5XX XXX XXX)
  // =========================
  function maskPhone(input) {
    if (!input || input.dataset.masked) return;
    input.dataset.masked = "1";

    input.addEventListener('input', () => {
      let d = input.value.replace(/\D/g, '');

      if (!d.startsWith('995')) {
        d = '995' + d;
      }

      d = d.substring(0, 12);

      let out = '+995';

      if (d.length > 3) out += ' ' + d.substring(3, 6);
      if (d.length >= 7) out += ' ' + d.substring(6, 9);
      if (d.length >= 10) out += ' ' + d.substring(9, 12);

      input.value = out;
    });

    input.addEventListener('focus', () => {
      if (!input.value) input.value = '+995 ';
    });
  }

  document.querySelectorAll('.phone-input').forEach(maskPhone);

  // =========================
  // FETCH SEND FUNCTION
  // =========================
  async function sendForm(form, successId) {
    try {
      const formData = new FormData(form);

      const res = await fetch('./send.php', {
        method: 'POST',
        body: formData
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('NOT JSON RESPONSE:', text);
        return;
      }

      if (data.success) {
        const msg = document.getElementById(successId);
        if (msg) msg.style.display = 'block';

        form.reset();

        setTimeout(() => {
          if (msg) msg.style.display = 'none';
        }, 3000);
      } else {
        console.error('SERVER ERROR:', data);
      }

    } catch (err) {
      console.error('FETCH ERROR:', err);
    }
  }

  // =========================
  // MAIN FORM
  // =========================
  const mainForm = document.getElementById('mainForm');

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendForm(mainForm, 'successMsg');
    });
  }

  // =========================
  // MODAL FORM (працює навіть якщо дублюється на сторінках)
  // =========================
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'modalForm') {
      e.preventDefault();
      sendForm(e.target, 'modalSuccess');
    }
  });

});
