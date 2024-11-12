export default function Button(props) {
    return <button disabled={props.disabled} onClick={e => props.onClickHandler(e)}>{props.children}</button>
}