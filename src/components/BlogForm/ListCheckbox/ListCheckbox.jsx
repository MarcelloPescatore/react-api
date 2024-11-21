export default function ListCheckbox({ tags, setTags }) {
    const handleChange = (e) => {
        const tagValue = e.target.value;
        if (e.target.checked) {
            setTags([...tags, tagValue]);
        } else {
            setTags(tags.filter(tag => tag !== tagValue));
        }
    };

    const availableTags = ["Tech", "Lifestyle", "Education", "Entertainment"];

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
