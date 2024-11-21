import React, { useState } from "react";
import ArticlesCalled from "./Articles/ArticlesCalled";

export default function BlogList({ articlesCalled, onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleEdit = (articlesCalled) => {
        // Imposto l'articolo in modifica e precompila i dati
        setEditingId(articlesCalled.id);
        setEditingData({
            title: articlesCalled.title,
            slug: articlesCalled.slug,
            image: articlesCalled.image,
            content: articlesCalled.content,
            status: articlesCalled.status
        });
    };

    const handleChange = (field, value) => {
        // Aggiorna il campo specifico nell'oggetto di modifica
        setEditingData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = (title) => {
        // Salva la modifica
        onUpdate(title, editingData);
        // Esce dalla modalità modifica
        setEditingId(null);
    };

    const handlePublish = (title) => {
        const articleToUpdate = articlesCalled.find(article => article.title === title);
        if (articleToUpdate.status === "draft") {
            // Cambia lo stato a 'published'
            onUpdate(title, { status: "published" });
        }
    };

    return (
        <div className="list">
            {/* articoli chiamata fetch */}
            <ArticlesCalled 
                articlesCalled={articlesCalled} 
                handleChange={handleChange} 
                handleEdit={handleEdit} 
                handleUpdate={handleUpdate} 
                setEditingId={setEditingId} 
                handlePublish={handlePublish}
                editingId={editingId} 
                editingData={editingData} 
                onDelete={onDelete} 
            />
        </div>
    );
};
