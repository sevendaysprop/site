const uprnInput = document.getElementById('uprnInput');
  const embeds = document.querySelectorAll('.propeco-embed');

  function showLoading(embed) {
    embed.innerHTML = `
      <div class="propeco-loading" aria-live="polite">
        <div>
          <div class="spinner-border spinner-border-sm me-2"></div>
          Loading property data…
        </div>
      </div>
    `;
  }

  function showError(embed) {
    embed.innerHTML = `
      <div class="propeco-error" role="alert">
        Unable to load property data. Please check the UPRN and try again.
      </div>
    `;
  }

  function trackEvent(name, detail) {
    // analytics hook (GA, Plausible, etc.)
    console.log('Analytics:', name, detail);
  }

  function observeEmbed(embed) {
    let loaded = false;

    const observer = new MutationObserver(() => {
      if (embed.children.length && !embed.querySelector('.propeco-loading')) {
        loaded = true;
        observer.disconnect();
        trackEvent('propeco_loaded', embed.dataset.section);
      }
    });

    observer.observe(embed, { childList: true, subtree: true });

    setTimeout(() => {
      if (!loaded) {
        observer.disconnect();
        showError(embed);
        trackEvent('propeco_error', embed.dataset.section);
      }
    }, 10000);
  }

  function updateEmbeds(uprn) {
    embeds.forEach(embed => {
      embed.setAttribute('data-uprn', uprn);
      showLoading(embed);
      observeEmbed(embed);
    });
  }

  document.getElementById('uprnForm').addEventListener('submit', e => {
    e.preventDefault();
    const uprn = uprnInput.value.replace(/\D/g, '');
    if (!uprn) return;

    uprnInput.value = uprn;
    updateEmbeds(uprn);

    new bootstrap.Tab(document.getElementById('epc-tab')).show();
    document.getElementById('epc').focus();
  });

  document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
    tab.addEventListener('shown.bs.tab', e => {
      trackEvent('tab_view', e.target.id);
      history.replaceState(null, '', e.target.dataset.bsTarget);
    });
  });