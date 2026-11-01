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
    if (value >= 90) return ["G1", "90 or greater", "Normal or high estimate"];
    if (value >= 60) return ["G2", "60–89", "Mildly decreased estimate"];
    if (value >= 45) return ["G3a", "45–59", "Mild to moderately decreased estimate"];
    if (value >= 30) return ["G3b", "30–44", "Moderately to severely decreased estimate"];
    if (value >= 15) return ["G4", "15–29", "Severely decreased estimate"];
    return ["G5", "Below 15", "Kidney failure range; urgent clinician interpretation"];
  }
  function render() {
    return '<section class="egfr-page" aria-label="2021 CKD-EPI race-free eGFR calculator">'+
      '<header class="egfr-hero"><div><span class="egfr-kicker">PICCOLO XPRESS · CLINICAL REFERENCE</span>'+
      '<h2>eGFR calculator</h2><p>2021 CKD-EPI creatinine equation. Race-free adult estimate using a measured creatinine value, age and the equation sex variable.</p></div>'+
      '<span class="egfr-method-tag">2021 · NO RACE COEFFICIENT</span></header>'+
      '<div class="egfr-message egfr-message--notice"><span aria-hidden="true">i</span><p><strong>Why use this?</strong> Piccolo may display an eGFR calculated using its built-in MDRD formula. That value is not interchangeable with the 2021 CKD-EPI result. Use this separate race-free estimate for clinical review according to the approved site reporting policy. Nothing is sent to Relaymed or Athena.</p></div>'+
      '<div class="egfr-layout"><section class="egfr-panel egfr-entry"><div class="egfr-panel-title"><span>01 · ENTER VALUES</span><h3>Calculate from creatinine</h3><p>Use the completed Piccolo creatinine result only if it is numeric, valid and reportable. Do not enter a suppressed or invalid result.</p></div>'+
      '<form id="egfr-form" novalidate><div class="egfr-fields">'+
      '<label class="egfr-field"><span>Creatinine <small>required</small></span><input id="egfr-creatinine" name="creatinine" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g., 1.0" autocomplete="off" required /></label>'+
      '<label class="egfr-field"><span>Creatinine units</span><select id="egfr-unit" name="unit"><option value="mgdl">mg/dL</option><option value="umol">µmol/L</option></select></label>'+
      '<label class="egfr-field"><span>Age <small>18–120 years</small></span><input id="egfr-age" name="age" type="number" min="18" max="120" step="1" inputmode="numeric" placeholder="Age in years" autocomplete="off" required /></label>'+
      '<label class="egfr-field"><span>Sex variable used by equation</span><select id="egfr-sex" name="sex" required><option value="">Select</option><option value="female">Female</option><option value="male">Male</option></select></label>'+
      '</div><p class="egfr-field-help">No race entry or race correction. For patients for whom the binary sex coefficient may not be appropriate, seek clinician guidance and consider confirmatory assessment.</p>'+
      '<div class="egfr-actions"><button type="reset" class="egfr-clear">Clear</button><button type="submit" class="egfr-primary">Calculate race-free eGFR</button></div>'+
      '</form></section>'+
      '<section class="egfr-panel egfr-output" aria-live="polite" aria-atomic="true"><div class="egfr-panel-title"><span>02 · ESTIMATE</span><h3>2021 CKD-EPI (creatinine)</h3><p>Standardized to body surface area of 1.73 m².</p></div>'+
      '<div id="egfr-result" class="egfr-result" data-state="empty"><strong class="egfr-result-number" id="egfr-result-number">—</strong><span class="egfr-result-unit">mL/min/1.73 m²</span><p id="egfr-result-status">Enter all required values, then calculate.</p></div>'+
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
      interpretation.innerHTML = '<div><span>GFR reference range</span><strong>'+esc(category[0])+' · '+esc(category[1])+' mL/min/1.73 m²</strong></div><p>'+esc(category[2])+'. This is a numerical category, not a CKD diagnosis.</p>';
    }
    form.addEventListener("submit", calculateFromForm);
    form.addEventListener("reset", function () {
      window.requestAnimationFrame(function () {
        unit.dataset.previous = "mgdl";
        creatinine.placeholder = "e.g., 1.0";
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
  window.LAB_EGFR_CALCULATOR = {render, bind, calculate};
})();