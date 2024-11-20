import React, { useState } from "react";

export default function BlogList({ articles, onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [editImg, setEditImg] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editStatus, setEditStatus] = useState("");

    const handleEdit = (article) => {
        // imposto l'articolo in modifica
        setEditingId(article.id);
        // Precompila il titolo
        setEditTitle(article.title);
        // precompila l'autore
        setEditAuthor(article.author);
        // precompila l'img
        setEditImg(article.img)
        // precompila content
        setEditContent(article.content)
        // precompila status
        setEditStatus(article.status)
    };

    const handleUpdate = (id) => {
        // salva la modifica
        onUpdate(id, { title: editTitle, author: editAuthor, img: editImg, content: editContent, status: editStatus });
        // esce dalla modialità modifica
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
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                value={editAuthor}
                                onChange={(e) => setEditAuthor(e.target.value)}
                            />
                            <input
                                type="text"
                                value={editImg}
                                onChange={(e) => setEditImg(e.target.value)}
                            />
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
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
        </div>
    );
};
