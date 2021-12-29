export default function Modal(props) {
    return ( 
        <div className="modal"> 
            <div className="modal-content">
                <p className="error">Select a number to roll next set of dice!</p>
                <span className="close" onClick={props.closeHandler}>&times;</span>
            </div>
        </div>
    );
}