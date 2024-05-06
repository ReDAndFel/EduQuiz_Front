import "./SelectComponent.css"

const SelectComponent = ({ list, onChange, defaultValue, firstOption }) => {
    return (
        <select value={defaultValue} onChange={onChange}>
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