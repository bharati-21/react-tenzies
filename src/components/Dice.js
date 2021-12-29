export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
    };

    const val = props.value;

    const dieDots= [];
    for(let i = 0; i<val; i++) {
        dieDots.push(<div className="die-dot"></div>);
    }

    return (
        <div className="die-face" onClick={props.clickHandler} style={styles}>
            {
                dieDots.map(dieDot => dieDot)
            }
        </div>
        
            /* 
            <div className="die-face" onClick={props.clickHandler} style={styles}>
                {props.value}
            </div>
            */ 
    )
}