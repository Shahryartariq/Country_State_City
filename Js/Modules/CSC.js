var CSCModule = (function () {
    var cUrl = 'https://api.countrystatecity.in/v1/countries';
    var ckey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';

    var countrySelect, stateSelect, citySelect;

    function loadCountries() {
        var apiEndPoint = cUrl;

        fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": ckey } })
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.iso2;
                    option.textContent = country.name;
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading countries:', error));

        stateSelect.disabled = true;
        citySelect.disabled = true;
        stateSelect.style.pointerEvents = 'none';
        citySelect.style.pointerEvents = 'none';
    }

    function loadStates() {
        stateSelect.disabled = false;
        citySelect.disabled = true;
        stateSelect.style.pointerEvents = 'auto';
        citySelect.style.pointerEvents = 'none';

        const selectedCountryCode = countrySelect.value;
        stateSelect.innerHTML = '<option value="">Select State</option>';
        citySelect.innerHTML = '<option value="">Select City</option>';

        fetch(`${cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": ckey } })
            .then(response => response.json())
            .then(data => {
                data.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.iso2;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading states:', error));
    }

    function loadCities() {
        citySelect.disabled = false;
        citySelect.style.pointerEvents = 'auto';

        const selectedCountryCode = countrySelect.value;
        const selectedStateCode = stateSelect.value;

        citySelect.innerHTML = '<option value="">Select City</option>';

        fetch(`${cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": ckey } })
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.iso2;
                    option.textContent = city.name;
                    citySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading cities:', error));
    }

    function init(countrySelector, stateSelector, citySelector) {
        countrySelect = document.querySelector(countrySelector);
        stateSelect = document.querySelector(stateSelector);
        citySelect = document.querySelector(citySelector);

        window.onload = loadCountries;
        countrySelect.addEventListener('change', loadStates);
        stateSelect.addEventListener('change', loadCities);
    }

    return {
        init: init
    };
})();

export default CSCModule;
