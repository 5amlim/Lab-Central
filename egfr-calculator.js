/* Adult eGFR reference calculator, 2021 CKD-EPI creatinine equation, race-free.
 * Source: NIDDK https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/adults
 * For education and clinician review; does not overwrite instrument, chart or laboratory reports.
 */
(function () {
  "use strict";
  const NIDDK = "https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/adults";
  const NIDDK_CALC = "https://www.niddk.nih.gov/health-information/professionals/clinical-tools-patient-management/kidney-disease/laboratory-evaluation/estimated-gfr-calculators/adults-pediatrics";
  const NKF = "https://www.kidney.org/professionals/gfr_calculator";
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

  // The equation uses a sex-specific coefficient, but it does NOT use race.
  // SCr is IDMS-standardized creatinine in mg/dL. Result is mL/min/1.73 m².
  function calculate(creatinineMgDl, age, sex) {
    if (!Number.isFinite(creatinineMgDl) || creatinineMgDl <= 0 ||
        !Number.isFinite(age) || !Number.isInteger(age) || age < 18 || age > 120 ||
        (sex !== "female" && sex !== "male")) return null;
    const female = sex === "female";
    const kappa = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;
    const ratio = creatinineMgDl / kappa;
    return 142 * Math.pow(Math.min(ratio, 1), alpha) *
      Math.pow(Math.max(ratio, 1), -1.2) * Math.pow(0.9938, age) *
      (female ? 1.012 : 1);
  }
  function band(value) {
    const g12Note = " alone does not indicate CKD. Assess other markers of kidney damage and clinical history.";
    const chronicityNote = "A single result does not establish CKD. Assess persistence for at least 3 months, other kidney markers and clinical history.";
    if (value >= 90) return ["G1", "≥90", "Normal or high", "G1" + g12Note];
    if (value >= 60) return ["G2", "60–89", "Mildly decreased", "G2" + g12Note];
    if (value >= 45) return ["G3a", "45–59", "Mildly to moderately decreased", chronicityNote];
    if (value >= 30) return ["G3b", "30–44", "Moderately to severely decreased", chronicityNote];
    if (value >= 15) return ["G4", "15–29", "Severely decreased", chronicityNote];
    return ["G5", "<15", "Kidney failure range", "Prompt clinician interpretation is needed. A single result does not establish chronicity."];
  }

  // Match the in-portal location selector used elsewhere in Lab Central.
  // The hidden value preserves the existing calculation and unit conversion logic.
  function picker(id, label, options, initialValue) {
    const current = options.find(option => option[0] === initialValue);
    const optionRows = options.map(([value, title]) => {
      const selected = value === initialValue;
      return '<button type="button" class="egfr-picker-option'+(selected?' is-selected':'')+'" role="option" '+
        'tabindex="-1" data-egfr-option="'+esc(value)+'" aria-selected="'+selected+'">'+
        '<span>'+esc(title)+'</span><span class="egfr-picker-check" aria-hidden="true">'+(selected?'✓':'')+'</span></button>';
    }).join('');
    return '<div class="egfr-field"><span id="'+id+'-label">'+esc(label)+'</span>'+
      '<div class="egfr-picker" data-egfr-picker="'+id+'">'+
      '<input type="hidden" id="'+id+'" name="'+(id==='egfr-unit'?'unit':'sex')+'" value="'+esc(initialValue)+'">'+
      '<button type="button" class="egfr-picker-trigger" aria-haspopup="listbox" aria-expanded="false" '+
      'aria-controls="'+id+'-options" aria-labelledby="'+id+'-label '+id+'-current">'+
      '<span class="egfr-picker-value'+(current?'':' is-placeholder')+'" id="'+id+'-current">'+esc(current?current[1]:'Select')+'</span>'+
      '<span class="egfr-picker-chevron" aria-hidden="true"></span></button>'+
      '<div id="'+id+'-options" class="egfr-picker-list" role="listbox" aria-labelledby="'+id+'-label" hidden>'+
      optionRows+'</div></div></div>';
  }
  function render() {
    return '<section class="egfr-page" aria-label="2021 CKD-EPI race-free eGFR calculator">'+
      '<header class="egfr-hero"><div><span class="egfr-kicker">PICCOLO XPRESS · CLINICAL REFERENCE</span>'+
      '<h2>eGFR calculator</h2><p>2021 CKD-EPI creatinine equation. Race-free adult estimate using a measured creatinine value, age and the equation sex variable.</p></div>'+
      '<span class="egfr-method-tag">2021 · NO RACE COEFFICIENT</span></header>'+
      '<div class="egfr-message egfr-message--notice"><span aria-hidden="true">i</span><p><strong>Why use this?</strong> Piccolo may display an eGFR calculated using its built-in MDRD formula. That value is not interchangeable with the 2021 CKD-EPI result. Use this separate race-free estimate for clinical review according to the approved site reporting policy. Nothing is sent to Relaymed or Athena.</p></div>'+
      '<div class="egfr-layout"><section class="egfr-panel egfr-entry"><div class="egfr-panel-title"><span>01 · ENTER VALUES</span><div class="egfr-entry-heading"><h3>Calculate from creatinine</h3><small class="egfr-creatinine-sources" aria-label="Piccolo panels with creatinine">BMP · CMP · MetLyte + CRP · MetLac 12</small></div><p>Use the completed Piccolo creatinine result only if it is numeric, valid and reportable. Do not enter a suppressed or invalid result.</p></div>'+
      '<form id="egfr-form" novalidate><div class="egfr-fields">'+
      '<label class="egfr-field"><span>Creatinine <small>required</small></span><input id="egfr-creatinine" name="creatinine" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g., 1.0" autocomplete="off" required /></label>'+
      picker('egfr-unit','Creatinine units',[['mgdl','mg/dL'],['umol','µmol/L']],'mgdl')+
      '<label class="egfr-field"><span>Age <small>18–120 years</small></span><input id="egfr-age" name="age" type="number" min="18" max="120" step="1" inputmode="numeric" placeholder="Age in years" autocomplete="off" required /></label>'+
      picker('egfr-sex','Sex variable used by equation',[['female','Female'],['male','Male']],'')+
      '</div><p class="egfr-field-help">No race entry or race correction. For patients for whom the binary sex coefficient may not be appropriate, seek clinician guidance and consider confirmatory assessment.</p>'+
      '<div class="egfr-actions"><button type="reset" class="egfr-clear">Clear</button><button type="submit" class="egfr-primary">Calculate race-free eGFR</button></div>'+
      '</form></section>'+
      '<section class="egfr-panel egfr-output" aria-live="polite" aria-atomic="true"><div class="egfr-panel-title"><span>02 · ESTIMATE</span><h3>2021 CKD-EPI (creatinine)</h3><p>Standardized to body surface area of 1.73 m².</p></div>'+
      '<div id="egfr-result" class="egfr-result" data-state="empty"><div class="egfr-result-heading"><strong class="egfr-result-number" id="egfr-result-number">—</strong><span class="egfr-result-name" aria-hidden="true">eGFR</span></div><span class="egfr-result-unit">mL/min/1.73 m²</span><p id="egfr-result-status">Enter all required values, then calculate.</p></div>'+
      '<div id="egfr-interpretation" class="egfr-result-band" hidden></div>'+
      '<div class="egfr-output-foot"><strong>Reference estimate only</strong><p>A single eGFR value does not diagnose CKD. Confirm persistence for at least 3 months and assess urine albumin/creatinine ratio or other kidney-damage markers where indicated. Results are less reliable during rapidly changing kidney function.</p></div></section></div>'+
      '<section class="egfr-method"><div><span>HOW IT WORKS</span><h3>About the calculation</h3><p><b>Equation:</b> 2021 CKD-EPI creatinine (IDMS-standardized SCr), adults 18 years or older. Inputs are creatinine, age and the equation sex variable. No race input or race multiplier is used.</p><p><b>Clinical use:</b> The calculated result is independent of the instrument printout. Do not silently replace, manually overwrite or report it as a validated laboratory result without approval under the clinic SOP. For decisions near an important threshold, a creatinine plus cystatin C estimate may improve accuracy.</p></div>'+
      '<div class="egfr-links"><a href="'+esc(NIDDK_CALC)+'" target="_blank" rel="noopener noreferrer">Verify with NIDDK calculator ↗</a>'+
      '<a href="'+esc(NKF)+'" target="_blank" rel="noopener noreferrer">National Kidney Foundation calculator ↗</a>'+
      '<a href="'+esc(NIDDK)+'" target="_blank" rel="noopener noreferrer">View equation and limitations ↗</a></div></section>'+
      '<div class="egfr-return"><button type="button" data-gotab="result-interpretation">← Back to result interpretation</button></div>'+
      '</section>';
  }
  function bind() {
    const form = document.getElementById("egfr-form");
    if (!form || form.dataset.egfrBound) return;
    form.dataset.egfrBound = "1";
    const creatinine = form.querySelector("#egfr-creatinine");
    const ageInput = form.querySelector("#egfr-age");
    const sexInput = form.querySelector("#egfr-sex");
    const unit = form.querySelector("#egfr-unit");
    const result = document.getElementById("egfr-result");
    const number = document.getElementById("egfr-result-number");
    const status = document.getElementById("egfr-result-status");
    const interpretation = document.getElementById("egfr-interpretation");

    const pickers = Array.from(form.querySelectorAll(".egfr-picker"));
    function syncPicker(picker) {
      const field = picker.querySelector('input[type="hidden"]');
      const options = Array.from(picker.querySelectorAll(".egfr-picker-option"));
      const selected = options.find(item => item.dataset.egfrOption === field.value);
      const display = picker.querySelector(".egfr-picker-value");
      display.textContent = selected ? selected.querySelector("span").textContent : "Select";
      display.classList.toggle("is-placeholder", !selected);
      for (const option of options) {
        const chosen = option === selected;
        option.classList.toggle("is-selected", chosen);
        option.setAttribute("aria-selected", String(chosen));
        option.querySelector(".egfr-picker-check").textContent = chosen ? "✓" : "";
      }
    }
    function setPickerOpen(target, open, focusOption = false, returnFocus = false) {
      for (const picker of pickers) {
        const active = picker === target && open;
        picker.classList.toggle("is-open", active);
        picker.querySelector(".egfr-picker-list").hidden = !active;
        const trigger = picker.querySelector(".egfr-picker-trigger");
        trigger.setAttribute("aria-expanded", String(active));
        if (active && focusOption) {
          (picker.querySelector(".egfr-picker-option.is-selected") ||
           picker.querySelector(".egfr-picker-option"))?.focus();
        }
        if (picker === target && !active && returnFocus) trigger.focus();
      }
    }
    function choosePickerOption(option) {
      const picker = option.closest(".egfr-picker");
      const input = picker.querySelector('input[type="hidden"]');
      const changed = input.value !== option.dataset.egfrOption;
      input.value = option.dataset.egfrOption;
      syncPicker(picker);
      setPickerOpen(picker, false, false, true);
      // Reuse the same unit-conversion or result-clearing handlers.
      if (changed) input.dispatchEvent(new Event("change", {bubbles: true}));
    }
    form.addEventListener("click", function (event) {
      const trigger = event.target.closest(".egfr-picker-trigger");
      if (trigger) {
        const picker = trigger.closest(".egfr-picker");
        setPickerOpen(picker, !picker.classList.contains("is-open"));
        return;
      }
      const option = event.target.closest(".egfr-picker-option");
      if (option) choosePickerOption(option);
    });
    form.addEventListener("keydown", function (event) {
      const trigger = event.target.closest(".egfr-picker-trigger");
      if (trigger && ["ArrowDown","ArrowUp"].includes(event.key)) {
        event.preventDefault();
        const picker = trigger.closest(".egfr-picker");
        setPickerOpen(picker, true, true);
        if (event.key === "ArrowUp") picker.querySelector(".egfr-picker-option:last-child")?.focus();
        return;
      }
      const option = event.target.closest(".egfr-picker-option");
      if (option) {
        const picker = option.closest(".egfr-picker");
        if (event.key === "Escape") {
          event.preventDefault();
          setPickerOpen(picker, false, false, true);
          return;
        }
        if (event.key === "Tab") {setPickerOpen(picker, false);return;}
        const options = Array.from(picker.querySelectorAll(".egfr-picker-option"));
        const index = options.indexOf(option);
        const next = event.key === "ArrowDown" ? options[(index+1)%options.length] :
          event.key === "ArrowUp" ? options[(index-1+options.length)%options.length] :
          event.key === "Home" ? options[0] : event.key === "End" ? options[options.length-1] : null;
        if (next) {event.preventDefault();next.focus();}
        return;
      }
      if (event.key === "Escape") pickers.forEach(p => {
        if (p.classList.contains("is-open")) setPickerOpen(p, false, false, true);
      });
    });

    function clearResult() {
      number.textContent = "—";
      result.dataset.state = "empty";
      status.textContent = "Enter all required values, then calculate.";
      interpretation.hidden = true;
      interpretation.textContent = "";
    }
    function calculateFromForm(event) {
      if (event) event.preventDefault();
      const raw = Number(creatinine.value);
      const age = Number(ageInput.value);
      const sex = sexInput.value;
      const mgDl = unit.value === "umol" ? raw / 88.4 : raw;
      const valid = creatinine.value.trim() !== "" &&
        ageInput.value.trim() !== "" && sex !== "" &&
        Number.isFinite(raw) && raw > 0 && Number.isInteger(age) &&
        age >= 18 && age <= 120;
      const value = valid ? calculate(mgDl, age, sex) : null;
      if (value === null || !Number.isFinite(value)) {
        clearResult();
        result.dataset.state = "invalid";
        status.textContent = "Enter a valid reportable creatinine, whole-number age from 18 to 120, and the sex equation variable.";
        return;
      }
      const rounded = Math.round(value);
      const category = band(rounded);
      number.textContent = String(rounded);
      status.textContent = "Calculated from the values entered above · CKD-EPI 2021, no race coefficient.";
      result.dataset.state = "valid";
      interpretation.hidden = false;
      interpretation.innerHTML = '<div class="egfr-category-eyebrow">GFR CATEGORY</div>'+ 
        '<strong class="egfr-category-title">'+esc(category[0])+' · '+esc(category[2])+'</strong>'+
        '<div class="egfr-category-range">'+esc(category[1])+' mL/min/1.73 m²</div>'+
        '<p>'+esc(category[3])+'</p>';
    }
    form.addEventListener("submit", calculateFromForm);
    form.addEventListener("reset", function () {
      window.requestAnimationFrame(function () {
        unit.dataset.previous = "mgdl";
        creatinine.placeholder = "e.g., 1.0";
        pickers.forEach(p => {syncPicker(p);setPickerOpen(p, false);});
        clearResult();
      });
    });
    unit.dataset.previous = unit.value;
    unit.addEventListener("change", function () {
      const old = unit.dataset.previous || "mgdl";
      const next = unit.value;
      if (creatinine.value.trim() !== "") {
        const n = Number(creatinine.value);
        if (Number.isFinite(n) && n > 0 && old !== next) {
          const converted = old === "mgdl" ? n * 88.4 : n / 88.4;
          creatinine.value = String(Number(converted.toFixed(next === "umol" ? 2 : 4)));
        }
      }
      unit.dataset.previous = next;
      creatinine.placeholder = next === "umol" ? "e.g., 88.4" : "e.g., 1.0";
      clearResult();
    });
    [creatinine, ageInput, sexInput].forEach(input => {
      input.addEventListener("input", clearResult);
      input.addEventListener("change", clearResult);
    });
  }

  // One document-level handler, including after a portal tab rerender.
  document.addEventListener("click", function (event) {
    if (event.target.closest(".egfr-picker")) return;
    document.querySelectorAll(".egfr-picker.is-open").forEach(picker => {
      picker.classList.remove("is-open");
      picker.querySelector(".egfr-picker-list").hidden = true;
      picker.querySelector(".egfr-picker-trigger").setAttribute("aria-expanded", "false");
    });
  });
  window.LAB_EGFR_CALCULATOR = {render, bind, calculate};
})();