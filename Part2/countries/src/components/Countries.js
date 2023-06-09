const Countries = ({showcountries, setshowcountries}) =>{
        if (showcountries.length===1) return null
        console.log("inside countries",showcountries)
        return(
               showcountries.map((country)=>(<li key={country.name.official}>{country.name.common}<button onClick={()=> setshowcountries([country])}>show</button></li>))
        )
}
export default Countries
