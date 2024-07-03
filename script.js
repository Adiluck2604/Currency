const apiKey = 'c8b801edcc834308818e0ada18a86c71';
const apiUrl = https://openexchangerates.org/api/latest.json?app_id=${apiKey};

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.text = currency;
            fromCurrency.add(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.text = currency;
            toCurrency.add(optionTo);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convert() {
    try {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const result = amount * rate;

        document.getElementById('result').innerText = ${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency};
    } catch (error) {
        console.error('Error converting currencies:', error);
    }
}

fetchCurrencies();