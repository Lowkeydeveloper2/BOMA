// ==========================================
// BMI Calculator Script
// ==========================================

// --- Initialize footer year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Get DOM elements ---
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCat');

// --- Calculate BMI ---
function computeBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return NaN;
  const heightMeters = heightCm / 100;
  return weightKg / (heightMeters * heightMeters);
}

// --- Determine BMI category ---
function getBMICategory(bmi) {
  if (!isFinite(bmi)) return '';
  if (bmi < 18.5) return 'Podvýživa';
  if (bmi < 25) return 'Normálna hmotnosť';
  if (bmi < 30) return 'Nadváha';
  return 'Obezita';
}

// --- Update BMI display ---
function updateBMI() {
  const bmi = computeBMI(
    parseFloat(heightInput.value),
    parseFloat(weightInput.value)
  );
  
  bmiValue.textContent = isFinite(bmi) ? bmi.toFixed(1) : '–';
  bmiCategory.textContent = isFinite(bmi) ? getBMICategory(bmi) : '';
}

// --- Event listeners ---
heightInput.addEventListener('input', updateBMI);
weightInput.addEventListener('input', updateBMI);

// --- Initial calculation ---
updateBMI();
