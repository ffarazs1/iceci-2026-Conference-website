const region = document.getElementById("region");
const category = document.getElementById("category");
const period = document.getElementById("period");

const taxLabel = document.getElementById("taxLabel");
const taxRateInput = document.getElementById("taxRate");

const baseFeeEl = document.getElementById("baseFee");
const taxAmountEl = document.getElementById("taxAmount");
const totalFeeEl = document.getElementById("totalFee");

/* Exact values from your tables */
const feeStructure = {
  indian: {
    currency: "₹",
    taxName: "GST",
    taxRate: 18,
    categories: {
      "IEEE Student": { early: 6400, regular: 7200 },
      "IEEE Member": { early: 8000, regular: 8800 },
      "Non-IEEE Student": { early: 8000, regular: 9000 },
      "Non-IEEE Member": { early: 10000, regular: 11000 },
      "Only Attending Student (Indian)": { early: 2500, regular: 3000 },
      "Only Attending Faculty/Industry Participants (Indian)": { early: 4000, regular: 5000 }
    }
  },
  nonindian: {
    currency: "$",
    taxName: "VAT",
    taxRate: 12,
    categories: {
      "IEEE Student": { early: 280, regular: 560 },
      "IEEE Member": { early: 280, regular: 560 },
      "Non-IEEE Student": { early: 300, regular: 750 },
      "Non-IEEE Member": { early: 350, regular: 825 },
      "Only Attending (Foreign)": { early: 75, regular: 100 }
    }
  }
};

function format(currency, value) {
  return `${currency} ${value.toFixed(2)}`;
}

function populateCategories() {
  const data = feeStructure[region.value];
  category.innerHTML = "";

  Object.keys(data.categories).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    category.appendChild(opt);
  });
}

function updateTaxUI() {
  const data = feeStructure[region.value];
  taxLabel.textContent = `${data.taxName} (${data.taxRate}%)`;
  taxRateInput.value = `${data.taxRate}%`;
}

function calculate() {
  const data = feeStructure[region.value];
  const base = data.categories[category.value][period.value];
  const tax = base * data.taxRate / 100;
  const total = base + tax;

  baseFeeEl.textContent = format(data.currency, base);
  taxAmountEl.textContent = format(data.currency, tax);
  totalFeeEl.textContent = format(data.currency, total);
}

/* Events */
region.addEventListener("change", () => {
  populateCategories();
  updateTaxUI();
  calculate();
});

category.addEventListener("change", calculate);
period.addEventListener("change", calculate);

/* Init */
populateCategories();
updateTaxUI();
calculate();
