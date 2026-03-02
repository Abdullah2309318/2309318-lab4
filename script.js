const spinner = document.getElementById('loading-spinner');
spinner.classList.add('hidden');

async function searchCountry(countryName) {
    try {
        document.getElementById('country-info').innerHTML = ""
        // Show loading spinner
        spinner.classList.remove('hidden');

        // Fetch country data
        const countryInfoURL = `https://restcountries.com/v3.1/name/${countryName}`;
        const countryInfoResponse = await fetch(countryInfoURL);
        const countryData = await countryInfoResponse.json();
        const country = countryData[0]; 
        // console.log(countryName);
        // console.log(country.capital);
        // console.log(country.population);
        // console.log(country.region);
        // console.log(country.flags.png);
        // console.log(country.cca2);

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
        if(country.borders) {
            for (let i = 0; i < borders.length; i++) {
                let borderArr = [];
                const url = `https://restcountries.com/v3.1/alpha/${borders[i]}`;
                const response = await fetch(url);
                const data = await response.json();

                borderArr.push(data[0].name.common);
                borderArr.push(data[0].flag);
                bordersArr.push(borderArr);
            }
            
            // Update bordering countries section
            document.getElementById('bordering-countries').innerHTML = `
            <p><strong>Bordering Countries:</strong> ${bordersArr}</p>`   
        }
        else {
            document.getElementById('bordering-countries').innerHTML = `
            <p><strong>Bordering Countries:</strong> ${countryName} does not have any borders.</p>`   
        }

        console.log(bordersArr);
        


    } 
    
    catch (error) {
        // Show error message
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