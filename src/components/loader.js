const Loader = ({loading}) => {
    return (
        <>
            {
                loading && <div className="loading">
                    <i className="fa-solid fa-circle-notch fa-spin" ></i>
                </div>
                
            }
        </>
    )
}

export default Loader;