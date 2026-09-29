/**
 * SMRITI SETU - INTERACTIVE FEATURES & CRAFT INSPECTOR
 * Archival records filtering, tactile material inspection,
 * form submission handling with toast notifications.
 */

import { archivalCatalog } from './catalogData.js';
import { icons } from './icons.js';

export function initInteractiveFeatures() {
  initCatalog();
  initTactileInspector();
  initSubmissionForm();
  initModal();
}

/* 1. ARCHIVAL CATALOG SYSTEM */
function initCatalog() {
  const container = document.getElementById('catalogGrid');
  const searchInput = document.getElementById('catalogSearchInput');
  const filterChips = document.querySelectorAll('.filter-chip');
  if (!container) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderRecords() {
    const filtered = archivalCatalog.filter(record => {
      const matchesCategory = currentCategory === 'all' || record.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesQuery = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">${icons.fileText}</div>
          <h4 class="empty-state-title">No Archival Records Found</h4>
          <p class="empty-state-desc">No preserved documents match your filter query. Reset search terms or inspect another collection category.</p>
          <button class="btn btn-secondary" id="resetFilterBtn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchQuery = '';
          currentCategory = 'all';
          filterChips.forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
          renderRecords();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(record => `
      <article class="stitched-card record-card" data-record-id="${record.id}">
        <div class="record-top-meta">
          <span class="record-id">${record.id}</span>
          <span class="record-category">${record.category}</span>
        </div>
        <div>
          <h3 class="record-card-title">${record.title}</h3>
          <p class="record-card-summary" style="margin-top: 0.5rem;">${record.summary}</p>
        </div>
        <div class="record-card-footer">
          <span style="display: flex; align-items: center; gap: 0.35rem;">
            ${icons.calendar} ${record.date}
          </span>
          <span class="brass-stamp" style="font-size: 0.7rem; padding: 0.15rem 0.45rem;">
            ${icons.verified} VERIFIED
          </span>
        </div>
      </article>
    `).join('');

    container.querySelectorAll('.record-card').forEach(card => {
      card.addEventListener('click', () => {
        const recId = card.dataset.recordId;
        const record = archivalCatalog.find(r => r.id === recId);
        if (record) openRecordModal(record);
      });
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderRecords();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderRecords();
    });
  }

  renderRecords();
}

/* 2. TACTILE MATERIAL INSPECTOR */
const inspectorSpecs = {
  twill: {
    title: "14oz Raw Indigo Selvedge Twill",
    subtitle: "Warp: Indigo Ring-Spun Cotton | Weft: Natural Unbleached Ecru",
    description: "Constructed on vintage narrow-width shuttle looms operating at 180 picks per minute. The dense 3/1 right-hand twill weave yields exceptional tensile resistance while allowing the fabric to conform to movement over decades of labor.",
    metrics: [
      { label: "Fabric Weight", value: "14.5 oz / sq yd" },
      { label: "Loom Type", value: "Narrow Shuttle Loom (29-inch)" },
      { label: "Warp Yarn Count", value: "7s Ring-Spun Pure Cotton" },
      { label: "Selvedge Edge", value: "Double Red Ticker Line" }
    ],
    badge: "TEXTILE INTEGRITY"
  },
  stitch: {
    title: "Double Golden Chain-Stitching",
    subtitle: "Heavy Gauge 3-Ply Core-Spun Poly-Cotton Thread",
    description: "Employed along stress seams and load-bearing edges. The interlocking looped chain provides elasticity under directional pull, preventing seam rupture. Stitched at an exact rhythm of 8 stitches per inch in heritage thread gold.",
    metrics: [
      { label: "Thread Composition", value: "3-Ply Gold Polyester Core / Cotton Wrap" },
      { label: "Stitch Density", value: "8 Stitches Per Inch (SPI)" },
      { label: "Break Strength", value: "18.2 lbs Single Strand" },
      { label: "Seam Profile", value: "Dual Needle Felled Inseam" }
    ],
    badge: "STRUCTURAL FASTENING"
  },
  rivet: {
    title: "Solid Hammered Copper Hardware",
    subtitle: "Cold-Formed Copper Washer & Stamped Central Burr",
    description: "Directly adapted from historical harness and pocket reinforcement engineering. Each rivet pierces 8 layers of denim twill, clamped with a solid copper burr to guarantee permanent corner anchoring without thread fraying.",
    metrics: [
      { label: "Metal Alloy", value: "99.9% Electrolytic Copper (UNS C11000)" },
      { label: "Head Diameter", value: "9.5 mm Domed Face" },
      { label: "Corrosion Grade", value: "Marine Atmospheric Resistant" },
      { label: "Setting Pressure", value: "Manual Die Punch Clamping" }
    ],
    badge: "PERMANENT HARDWARE"
  },
  leather: {
    title: "Vegetable-Tanned Steerhide Patch",
    subtitle: "5.5oz Full-Grain Leather with Hot-Iron Branded Typography",
    description: "Tanned using oak bark and chestnut liquors over 60 days. Untreated with synthetic sealants, allowing natural atmospheric darkening over years. Fastened to the rear waistband with perimeter gold basting stitches.",
    metrics: [
      { label: "Hide Selection", value: "Grade-A Full Grain Heavy Steerhide" },
      { label: "Tannage Method", value: "100% Tree Bark Vegetable Liquor" },
      { label: "Thickness", value: "2.2 mm (5.5 oz weight)" },
      { label: "Branding Heat", value: "220°C Cast Brass Debossing" }
    ],
    badge: "HERITAGE EMBOSSING"
  }
};

function initTactileInspector() {
  const tabs = document.querySelectorAll('.inspector-tab-btn');
  const titleEl = document.getElementById('inspectorTitle');
  const subtitleEl = document.getElementById('inspectorSubtitle');
  const descEl = document.getElementById('inspectorDesc');
  const badgeEl = document.getElementById('inspectorBadge');
  const metricsEl = document.getElementById('inspectorMetrics');

  if (!tabs.length || !titleEl) return;

  function setInspector(key) {
    const data = inspectorSpecs[key];
    if (!data) return;

    tabs.forEach(t => t.classList.toggle('active', t.dataset.material === key));

    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descEl.textContent = data.description;
    badgeEl.textContent = data.badge;

    metricsEl.innerHTML = data.metrics.map(m => `
      <div style="background: rgba(14, 22, 36, 0.6); border: 1px solid rgba(220, 179, 92, 0.2); border-radius: 4px; padding: 0.65rem 0.85rem;">
        <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-dim); text-transform: uppercase;">${m.label}</div>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-thread-gold); font-weight: 600; margin-top: 0.2rem;">${m.value}</div>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setInspector(tab.dataset.material);
    });
  });

  setInspector('twill');
}

/* 3. MODAL FOR RECORD INSPECTION */
let modalBackdrop = null;

function initModal() {
  modalBackdrop = document.getElementById('recordModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
}

function openRecordModal(record) {
  if (!modalBackdrop) return;
  const content = document.getElementById('modalBody');
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px dashed rgba(220, 179, 92, 0.25); padding-bottom: 0.75rem;">
      <div class="selvedge-tape">${record.accession}</div>
      <div class="brass-stamp">${icons.verified} VERIFIED PHYSICAL PROVENANCE</div>
    </div>
    <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--color-secondary);">${record.title}</h2>
    <div style="display: flex; gap: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-thread-gold); margin-bottom: 1.25rem;">
      <span>${icons.calendar} ${record.date}</span>
      <span>${record.category}</span>
    </div>
    
    <div style="background: rgba(14, 22, 36, 0.7); border: 1px solid rgba(220, 179, 92, 0.25); border-radius: 6px; padding: 1rem; margin-bottom: 1.25rem;">
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-dim); text-transform: uppercase; margin-bottom: 0.25rem;">Material Medium & Binding</div>
      <div style="font-size: 0.95rem; color: var(--color-canvas-light); font-weight: 500;">${record.medium}</div>
      <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-dim); text-transform: uppercase; margin-top: 0.75rem; margin-bottom: 0.25rem;">Archival Provenance Depot</div>
      <div style="font-size: 0.95rem; color: var(--color-canvas-light);">${record.provenance}</div>
    </div>

    <p style="font-size: 1rem; line-height: 1.65; color: var(--color-text-muted); margin-bottom: 1.5rem;">${record.summary}</p>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary" id="citeRecordBtn" style="padding: 10px 18px;">
        ${icons.book} Copy Standard Citation
      </button>
      <button class="btn btn-secondary" id="closeModalBtn" style="padding: 10px 18px;">
        Dismiss View
      </button>
    </div>
  `;

  modalBackdrop.classList.add('is-open');

  const citeBtn = document.getElementById('citeRecordBtn');
  if (citeBtn) {
    citeBtn.addEventListener('click', () => {
      const citation = `Smriti Setu Archive [${record.id}]: "${record.title}". Accession ${record.accession}, ${record.date}. Provenance: ${record.provenance}.`;
      navigator.clipboard.writeText(citation).then(() => {
        showToast("Archival citation copied to clipboard.");
      });
    });
  }

  const closeMBtn = document.getElementById('closeModalBtn');
  if (closeMBtn) {
    closeMBtn.addEventListener('click', closeModal);
  }
}

function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove('is-open');
  }
}

/* 4. SUBMISSION FORM & TOAST NOTIFICATION */
function initSubmissionForm() {
  const form = document.getElementById('preservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contributorName');
    const emailInput = document.getElementById('contributorEmail');
    const descInput = document.getElementById('recordDescription');

    let hasError = false;

    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      emailInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      emailInput.closest('.form-group').classList.remove('has-error');
    }

    if (!descInput.value.trim()) {
      descInput.closest('.form-group').classList.add('has-error');
      hasError = true;
    } else {
      descInput.closest('.form-group').classList.remove('has-error');
    }

    if (!hasError) {
      showToast("Archival submission registered. Docket receipt issued.");
      form.reset();
    }
  });
}

export function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--color-thread-gold);">${icons.check}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
