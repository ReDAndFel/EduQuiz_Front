import "./SelectComponent.css"

const SelectComponent = ({ list, onChange, defaultValue, firstOption, disabled }) => {
    return (
        <select value={defaultValue} onChange={onChange} disabled={disabled} >
            <option value="">{firstOption}</option>
            {list.map((element) => (
                <option key={element.id} value={element.id}>
                    {element.descripcion}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent