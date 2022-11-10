const Filter = ({ categories, selectedCategories, onChange }) => {
    const handleOnChange = (/** @type {string} */ id) => {
        if (selectedCategories.includes(id)) {
            onChange(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            onChange([...selectedCategories, id]);
        }
    };

    return (
        <div className="categories">
            {categories.map(({ id, name }) => (
                <div key={id}>
                    <input
                        type="checkbox"
                        id={id}
                        value={id}
                        onChange={() => handleOnChange(id)}
                        checked={selectedCategories.includes(id)}
                    />
                    <label htmlFor={id}>{name}</label>
                </div>
            ))}
        </div>
    );
};

export default Filter;
