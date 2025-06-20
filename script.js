const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");

const currencies = ["INR", "USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

function populateDropdowns() {
  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;

    const option2 = option1.cloneNode(true);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "INR";
  toCurrency.value = "USD";
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = `<p style="color:red;">Enter a valid amount.</p>`;
    return;
  }

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.result !== undefined) {
        const converted = data.result;
        resultDiv.innerHTML = `<strong>${amount} ${from} = ${converted.toFixed(2)} ${to}</strong>`;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">❌ Conversion failed. Please try again.</p>`;
      }
    })
    .catch(err => {
      console.error("Error:", err);
      resultDiv.innerHTML = `<p style="color:red;">❌ API error. Check your internet or try later.</p>`;
    });
}

populateDropdowns();
