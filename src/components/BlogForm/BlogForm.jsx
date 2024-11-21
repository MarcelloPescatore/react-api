import React, { useState } from "react";
import ListCheckbox from "./ListCheckbox/ListCheckbox";

export default function BlogForm() {
    // Stato unificato con tutti i dati del form
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        status: "draft",  // Aggiunto lo stato per la pubblicazione
        image: "",
        content: "",
        tags: [],  // Array di tags selezionati
        published: false // Stato per la pubblicazione dell'articolo
    });

    // Funzione per gestire il cambiamento dei valori
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => {
            let updatedData = { ...prevData }; 

            if (type === "checkbox" && name === "tags") {
                // Gestisci il cambiamento dei checkbox (tags)
                const newTags = checked
                    ? [...prevData.tags, value] // Aggiungi tag
                    : prevData.tags.filter((tag) => tag !== value); // Rimuovi tag
                updatedData = { ...prevData, tags: newTags };

            } else if (type === "checkbox") {
                // Aggiorna i checkbox generici
                updatedData = { ...prevData, [name]: checked };
            } else {
                // Aggiorna gli input di tipo testo e select
                updatedData = { ...prevData, [name]: value };
            }

            return updatedData; // Ritorna i dati aggiornati
        });
    };

    // Funzione di submit
    const handleSubmit = async () => {

        try {
            // Invia i dati al backend
            const response = await fetch('http://localhost:3002/posts/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Errore nella risposta del server');
            }

            const data = await response.json();
            console.log('Post salvato con successo:', data);

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

        } catch (error) {
            console.error('Errore durante l\'invio dei dati:', error);
            alert('Errore durante l\'invio del post. Riprova.');
        }
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
                    name="slug"
                    placeholder="slug"
                    value={formData.slug}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image address"
                    value={formData.image}
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
                tags={formData.tags}
                setTags={(tags) => setFormData({ ...formData, tags })}
            />
        </form>
    );
}
