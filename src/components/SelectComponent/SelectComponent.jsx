import "./SelectComponent.css"

const SelectComponent = ({ list, onChange, defaultValue, firstOption, disabled,elementValue }) => {
    return (
        <select value={ defaultValue ? defaultValue.id : ""} onChange={onChange} disabled={disabled} >
            <option value="">{firstOption}</option>
            {list.map((element) => (
                <option key={element.id} value={element.id}>
                    {elementValue ? element[elementValue]: element}
                </option>
            ))}
        </select>
    );
};

export default SelectComponent