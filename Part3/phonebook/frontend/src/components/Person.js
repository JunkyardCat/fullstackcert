const Person = (props) =>{
        return (
                <div>
            {props.showPerson.map((person)=>(
              <p key={person.id}>
                    {person.name} {person.number}
                 <button onClick={() => props.deleteContact(person.id,person.name)}>
                 delete
                 </button>
                    </p>
            ))
            }
                </div>
        )
}

export default Person
