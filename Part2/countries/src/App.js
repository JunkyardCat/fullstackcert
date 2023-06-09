import axios from "axios"
import {useState,useEffect} from "react"
import Country from "./components/Country"
import Countries from "./components/Countries"


const App = () =>{
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [showCountries, setShowCountries] = useState([])

    useEffect(() => {
            axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {setCountries(response.data)})
        
    },[])

    const searchCountry = (event) =>{
           const temp = event.target.value
           setSearch(temp)
           console.log("search",temp)
            console.log("search before:",countries)
            console.log("search showcountries 1:",showCountries.length,showCountries)
           setShowCountries(countries.filter((country) =>
                   country.name.common.toLowerCase().includes(search.toLowerCase())
                )
           )
            //setTimeout(()=>{console.log("timeout")},5000)
            //await delay(1000)
            console.log("search after:",countries)
            console.log("search showcountries 2:",showCountries.length,showCountries)

    }
console.log("app",showCountries)
    return(
        <>
        find countries <input value={search} onChange={searchCountry}/>
            {
             
             showCountries.length===1?(
                     <Country country={showCountries[0]}/>
             ):null


            }
            {
                    showCountries.length>10?(<p>Too many matches, specify another filter</p>):(<Countries showcountries={showCountries} setshowcountries={setShowCountries}/>)
            }
        </>
    )   
}
export default App
