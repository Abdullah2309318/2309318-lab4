const spinner = document.getElementById('loading-spinner');
spinner.classList.add('hidden');

async function searchCountry(countryName) {
    try {
        document.getElementById('country-info').innerHTML = ""
        // Show loading spinner
        spinner.classList.remove('hidden');
        // Fetch country data
        const URL = `https://restcountries.com/v3.1/name/${countryName}`;
        const response = await fetch(URL);
        const data = await response.json();
        const country = data[0];
        const code = country.cca2;
        console.log(countryName);
        console.log(country.capital);
        console.log(country.population);
        console.log(country.region);
        console.log(country.flags.png);
        console.log(country.cca2);
        // Update DOM
        document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
    <h3>Bordering Countries:</h3>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
`;
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
        console.error('Error fetching data:', error);
    } finally {
        // Hide loading spinner
        spinner.classList.add('hidden');
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});