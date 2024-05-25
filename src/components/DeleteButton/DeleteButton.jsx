import DeleteIcon from "../../../public/icons/delete_icon/DeleteIcon"
import "./DeleteButton.css"

const DeleteButton = ({handleClick}) =>{
    return(
        <button onClick={handleClick} className="delete-icon">
            <DeleteIcon/>
        </button>
    )
}

export default DeleteButton