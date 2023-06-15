const Notification = ({message}) => {
    if (message === null){
        return null
    }
    if (message.includes("failed"))
    {
            console.log("failed message")
            return (
                 <div className="error">
                    {message}
                 </div>
             )
    }
    return (
            <div className="notif">
             {message}
            </div>
           )
}

export default Notification
