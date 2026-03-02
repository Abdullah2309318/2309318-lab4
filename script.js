const spinner = document.getElementById('loading-spinner');
spinner.classList.add('hidden');

async function searchCountry(countryName) {
    try {
        document.getElementById('country-info').innerHTML = ""
        // Show loading spinner
        spinner.classList.remove('hidden');

        // Fetch country data
        const countryInfoURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=True`;
        const countryInfoResponse = await fetch(countryInfoURL);
        const countryData = await countryInfoResponse.json();
        const country = countryData[0]; 

        // Update DOM
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" class="country-flag" alt="${country.name.common} flag">`;


        // Fetch bordering countries
        const code = country.cca2;
        const borders = country.borders;

        let bordersArr = [];

        if (country.borders) {
            let bordersHTML = `<h3>Bordering Countries:</h3>`;
            
            for (const code of country.borders) {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const data = await response.json();
                const neighbor = data[0];

                bordersHTML += `
                    <section class="border-item">
                        <p>${neighbor.name.common}</p>
                        <p><img class="border-country-flag" src="${neighbor.flags.svg}"></p>
                    </section>
                `;
            }
            document.getElementById('bordering-countries').innerHTML = bordersHTML;
            const errorElement = document.getElementById('error-message');
            errorElement.textContent = "";
            errorElement.classList.remove('hidden'); 
        }
        else {
            document.getElementById('bordering-countries').innerHTML = `
            <p><strong>Bordering Countries:</strong> ${countryName} does not have any bordering countries.</p>`;
            const errorElement = document.getElementById('error-message');
            errorElement.textContent = "";
            errorElement.classList.remove('hidden');   
        }

        console.log(bordersArr);
        


    } 
    
    catch (error) {
        // Show error message
        document.getElementById('country-info').innerHTML = "";
        document.getElementById('bordering-countries').innerHTML = "";
        
        // Display the error message
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = "Error: Could not find that country. Please try another name.";
        errorElement.classList.remove('hidden');
        
        console.error('Error fetching data:', error);
    } 
    
    finally {
        // Hide loading spinner
        spinner.classList.add('hidden');
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

document.getElementById('country-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const country = document.getElementById('country-input').value;
        searchCountry(country);
    }
});