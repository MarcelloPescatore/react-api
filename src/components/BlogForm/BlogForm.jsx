import React, { useState } from "react";
import ListCheckbox from "./ListCheckbox/ListCheckbox"; // Assicurati che questo sia corretto

export default function BlogForm({ onSubmit }) {
    // Stato unificato con tutti i dati del form
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        status: "draft",  // Aggiunto lo stato per la pubblicazione
        img: "",
        content: "",
        tags: [],  // Array di tags selezionati
        published: false // Stato per la pubblicazione dell'articolo
    });

    const availableTags = ["Tech", "Lifestyle", "Education", "Entertainment"];

    // Funzione per gestire il cambiamento dei valori
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Gestisci il cambiamento dei checkbox (tags)
            setFormData((prevData) => {
                const newTags = checked
                    ? [...prevData.tags, value] // Aggiungi tag
                    : prevData.tags.filter((tag) => tag !== value); // Rimuovi tag
                return { ...prevData, tags: newTags };
            });
        } else if (type === "select-one") {
            // Gestisci il cambiamento del campo "status"
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else if (type === "checkbox") {
            // Per il checkbox di "published"
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            // Gestisci gli altri input
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Funzione di submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) return;

        // Invia i dati al componente genitore
        onSubmit({
            id: Date.now(),
            ...formData
        });

        // Reset dei campi del form
        setFormData({
            title: "",
            author: "",
            status: "draft",
            img: "",
            content: "",
            tags: [],
            published: false
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-input">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="img"
                    placeholder="Image address"
                    value={formData.img}
                    onChange={handleChange}
                />
            </div>
            <div className="container-input">
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                <button type="submit">Add Article</button>
            </div>
            {/* Gestione tags via component ListCheckbox */}
            <ListCheckbox
                availableTags={availableTags}
                tags={formData.tags}
                setTags={(tags) => setFormData({ ...formData, tags })}
            />
        </form>
    );
}
