import React, { useState } from "react";
import Articles from "./Articles/Articles";
import ArticlesCalled from "./Articles/ArticlesCalled";

export default function BlogList({ articles, articlesCalled, onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleEdit = (article) => {
        // Imposto l'articolo in modifica e precompila i dati
        setEditingId(article.id);
        setEditingData({
            title: article.title,
            author: article.author,
            img: article.img,
            content: article.content,
            status: article.status
        });
    };

    const handleChange = (field, value) => {
        // Aggiorna il campo specifico nell'oggetto di modifica
        setEditingData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = (id) => {
        // Salva la modifica
        onUpdate(id, editingData);
        // Esce dalla modalità modifica
        setEditingId(null);
    };

    const handlePublish = (id) => {
        const articleToUpdate = articles.find(article => article.id === id);
        if (articleToUpdate.status === "draft") {
            // Cambia lo stato a 'published'
            onUpdate(id, { status: "published" });
        }
    };

    return (
        <div className="list">
            <Articles 
                articles={articles}
                handleChange={handleChange}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                setEditingId={setEditingId}
                handlePublish={handlePublish}
                editingId={editingId}
                editingData={editingData}
                onDelete={onDelete}
            />

            {/* articoli chiamata fetch */}
            <ArticlesCalled 
                articlesCalled={articlesCalled} 
                handleChange={handleChange} 
                handleEdit={handleEdit} 
                handleUpdate={handleUpdate} 
                setEditingId={setEditingId} 
                editingId={editingId} 
                editingData={editingData} 
                onDelete={onDelete} 
            />
        </div>
    );
};
