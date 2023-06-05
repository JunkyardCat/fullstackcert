import {useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
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
    const [persons, setPersons]= useState([])
    const [newName, setNewName]= useState('')
    const [newNumber, setNewNumber]= useState('')
    const [newSearch, setNewSearch]= useState('')
    const [showPerson, setShowPerson]= useState(persons)
    
    useEffect(() => {
            console.log('effect')
            personService.getAll().then(initialData=>{
                    setShowPerson(initialData)
                    setPersons(initialData)
            })
    }, [])
    console.log('render', persons.length, 'notes')
    
    const deleteContact = (id,name) =>{
         if (window.confirm(`Delete ${name}?`)){   
         personService.del(id).then((response)=>
                 {
                         const updatePerson = persons.filter((person)=>person.id !== id)
                         setPersons(updatePerson)
                         setShowPerson(updatePerson)
                         console.log("inside delete",response)
                 }

         )
         }
    }

    const addContact = (event) =>{
       event.preventDefault()
       const dupeName = persons.filter((person)=>person.name===newName)
       const nameObject = {name: newName, number:newNumber, id:persons.length+1}
       if(dupeName.length===0)
       {
          //setPersons(persons.concat(nameObject))   
               
            //setShowPerson(persons.concat(nameObject))
               personService.create(nameObject).then(data=>
                       {
                           setPersons(persons.concat(data))
                           setShowPerson(persons.concat(data))
                       }
               )
               
               console.log(persons)
       }
       else{
               if(window.confirm(`${newName} is already existing do you still wanna change it?`))
               {
               console.log(dupeName)
          //window.confirm(`${newName} is already added ot the phonebook`)
            const searchPerson = persons.filter((person)=>person.name ===newName)
               console.log("searchPerson",searchPerson)
               searchPerson[0].number=newNumber
               console.log("searchPerson",searchPerson)

            personService.update(searchPerson[0].id, searchPerson[0]).then(data=>
               {
                       const updatedPerson = persons.map((person)=>person.id!==data.id ? person : data)
                       console.log("inside update",data)
                       console.log("inside update",updatedPerson)
                   setPersons(updatedPerson)
                   setShowPerson(updatedPerson)
               }
            )
               }
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
            console.log(persons)
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
            <Person showPerson={showPerson} deleteContact={deleteContact}/>
         </div>
           )
}
export default App
