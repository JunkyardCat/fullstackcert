const Country = ({ country }) => {
    if(!country) {
        return null
    }
    if(!country[0]) {
        return (
            <div>
                not found...
            </div>
        )
    }
    
    const countryBundle = country[0]
    
    return (
        <div>
            <h3>{countryBundle.name.common}</h3>
            <div>capital {countryBundle.capital[0]}</div>
            <div>population {countryBundle.population}</div>
            <img src={countryBundle.flags.svg} height='100' alt={`flag of ${countryBundle.name.common}`} />
        </div>
    )
}

export default Country