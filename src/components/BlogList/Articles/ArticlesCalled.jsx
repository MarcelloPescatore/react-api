export default function ArticlesCalled({articlesCalled, handleChange, handleEdit, handleUpdate, setEditingId, editingId, editingData, onDelete}) {
    return (
        <>
           {articlesCalled.map((article) => {
                const imageUrl = `http://localhost:3002/imgs/posts/${article.image}`
                return (<div key={article.id} className="blog-item">
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
                            </div>
                        </>
                    )}
                </div>
                )
            })}
        </>
    )
}