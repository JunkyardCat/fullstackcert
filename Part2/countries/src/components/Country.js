const Country = ({country})=>{
    return (
            <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p>Language: </p>
            <ul>
            {Object.values(country.languages).map((language) =>(<li key={language}>{language}</li>))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            </div>
    )
}
export default Country
