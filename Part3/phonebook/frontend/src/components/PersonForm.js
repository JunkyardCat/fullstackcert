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

export default PersonForm
