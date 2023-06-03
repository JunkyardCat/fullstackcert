import {useState} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
/*
const Person = (props) =>{
        return (
                <>
            {props.showPerson.map((person)=>(
                 <p key={person.id}> {person.name} {person.number}</p>
            ))}
                </>
        )
}
const PersonForm = (props) =>{
        return (
                <>
            <form onSubmit={props.addContact}>
                name: <input name="name" value={props.newName} onChange={props.handleNameChange}/>
                number: <input name="number" value={props.newNumber} onChange={props.handleNumberChange}/>
                <button type="submit">add</button>
            </form>


                </>
        )
}
const Filter = (props) =>{

        return(
                <>
            filter shown with <input name="search" value={props.newSearch} onChange={props.handleSearch} />
                </>
        )
}
*/
const App = () =>{
    const [persons, setPersons]= useState([
            {name:'Arto Hellas', number:'040-123456', id: 1},
            {name:'Ada Lovelace', number:'39-44-5324532', id: 2},
            {name: 'Dan Abramov', number: '12-43-234345', id: 3},
            {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName]= useState('')
    const [newNumber, setNewNumber]= useState('')
    const [newSearch, setNewSearch]= useState('')
    const [showPerson, setShowPerson]= useState(persons)

    const addContact = (event) =>{
       event.preventDefault()
       const dupeName = persons.filter((person)=>person.name===newName)
       const nameObject = [{name: newName, number:newNumber, id:persons.length+1}]
       if(dupeName.length===0)
       {
          console.log("inside dupename",nameObject)
          setPersons(persons.concat(nameObject))   
               
            setShowPerson(persons.concat(nameObject))
               console.log(persons)
       }
       else{
               console.log(dupeName)
          window.confirm(`${newName} is already added ot the phonebook`)
       }
    }
    const handleNameChange = (event) =>{
            setNewName(event.target.value)
    }
    const handleNumberChange = (event) =>{
            setNewNumber(event.target.value)
    }
    const handleSearch = (event) =>{
            const search = event.target.value
            
            setNewSearch(event.target.value)
            setShowPerson(persons.filter((person)=>person.name.toLowerCase().includes(search.toLowerCase())))
    }
    //{persons.map(person=><Contact key={person.id} contact={person}/>)}
        /*
            <form onSubmit={addContact}>
                name: <input name="name" value={newName} onChange={handleNameChange}/>
                number: <input name="number" value={newNumber} onChange={handleNumberChange}/>
                <button type="submit">add</button>
            </form>
        */

            //filter shown with <input name="search" value={newSearch} onChange={handleSearch} />
            //{showPerson.map(person=><Contact key={person.id} contact={person}/>)}
    return(
        <div>
            <h2>Phonebook</h2>
            <div>
            <Filter newSearch={newSearch} handleSearch={handleSearch}/>
            <PersonForm name={newName} number={newNumber} addContact={addContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
            
            </div>
            <h2>Numbers</h2>
            <Person showPerson={showPerson}/>
         </div>
           )
}
export default App
