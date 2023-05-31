const Person = (props) =>{
        return (
                <>
            {props.showPerson.map((person)=>(
                 <p key={person.id}> {person.name} {person.number}</p>
            ))}
                </>
        )
}

export default Person
