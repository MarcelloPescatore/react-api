import React, { useState } from "react";

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
            {articles.map((article) => (
                <div key={article.id} className="blog-item">
                    {editingId === article.id ? (
                        <div className="editing">
                            <input
                                type="text"
                                value={editingData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.author}
                                onChange={(e) => handleChange("author", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.img}
                                onChange={(e) => handleChange("img", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.content}
                                onChange={(e) => handleChange("content", e.target.value)}
                            />
                            <select value={editingData.status} onChange={(e) => handleChange("status", e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <div className="buttons-edit">
                                <button onClick={() => handleUpdate(article.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </ div>
                    ) : (
                        <>
                            <h3>{article.title}</h3>
                            <img src={article.img} alt="post image" />
                            <p>Author: {article.author}</p>
                            <p>Status: {article.status}</p>
                            <p>Content: {article.content}</p>
                            <p>Tags: {(article.tags || []).join(', ')}</p>



                            <div className="buttons">
                                <button onClick={() => handleEdit(article)}>Edit</button>
                                {/* cancella la modifica */}
                                <button onClick={() => onDelete(article.id)}>Delete</button>
                                {/* Bottone per cambiare stato da 'draft' a 'published' */}
                                {article.status === "draft" && (
                                    <button className="publish" onClick={() => handlePublish(article.id)}>
                                        Publish
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
            {articlesCalled.map((article) => {
                const imageUrl = `http://localhost:3002/images/posts/${article.image}`
              return  (<div key={article.id} className="blog-item">
                    {editingId === article.id ? (
                        <div className="editing">
                            <input
                                type="text"
                                value={editingData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.author}
                                onChange={(e) => handleChange("author", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.img}
                                onChange={(e) => handleChange("img", e.target.value)}
                            />
                            <input
                                type="text"
                                value={editingData.content}
                                onChange={(e) => handleChange("content", e.target.value)}
                            />
                            <select value={editingData.status} onChange={(e) => handleChange("status", e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <div className="buttons-edit">
                                <button onClick={() => handleUpdate(article.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </ div>
                    ) : (
                        <>
                            <h3>{article.title}</h3>
                            <img src={imageUrl} alt="post image" />
                            <p>Author: {article.author}</p>
                            <p>Status: {article.status}</p>
                            <p>Content: {article.content}</p>
                            <p>Tags: {(article.tags || []).join(', ')}</p>



                            <div className="buttons">
                                <button onClick={() => handleEdit(article)}>Edit</button>
                                {/* cancella la modifica */}
                                <button onClick={() => onDelete(article.id)}>Delete</button>
                                {/* Bottone per cambiare stato da 'draft' a 'published' */}
                                {article.status === "draft" && (
                                    <button className="publish" onClick={() => handlePublish(article.id)}>
                                        Publish
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )
            })}
        </div>
    );
};
