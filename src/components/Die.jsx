export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <button 
            onClick={() => props.hold(props.id)} 
            className="die" 
            style={styles}
            aria-pressed={props.isHeld}
            aria-label={`This is a die with a value of ${props.value},
            ${props.isHeld ? "held":"not held"}`}
            >{props.value}</button>
    )
}