export default function ListCheckbox({ availableTags, tags, setTags }) {
    const handleChange = (e) => {
        const tagValue = e.target.value;
        if (e.target.checked) {
            setTags([...tags, tagValue]);
        } else {
            setTags(tags.filter(tag => tag !== tagValue));
        }
    };

    return (
        <ul>
            {availableTags.map((tag) => (
                <li key={tag}>
                    <label>
                        <input
                            type="checkbox"
                            value={tag}
                            checked={tags.includes(tag)}
                            onChange={handleChange}
                        />
                        {tag}
                    </label>
                </li>
            ))}
        </ul>
    );
}
