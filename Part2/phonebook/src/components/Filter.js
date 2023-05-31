const Filter = (props) =>{

        return(
                <>
            filter shown with <input name="search" value={props.newSearch} onChange={props.handleSearch} />
                </>
        )
}

export default Filter
