import React, { useState } from "react";
import BlogForm from "./BlogForm/BlogForm";
import BlogList from "./BlogList/BlogList";

export default function AppMain() {
  const [articles, setArticles] = useState([]);

  const addArticle = (newArticle) => {
    setArticles([...articles, newArticle]);
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const updateArticle = (id, updatedArticle) => {
    setArticles(
      articles.map((article) =>
        article.id === id ? { ...article, ...updatedArticle } : article
      )
    );
  };

  return (
    <div className="app">
      <h1>React Blog Form</h1>
      <BlogForm onSubmit={addArticle} />
      <BlogList
        articles={articles}
        onDelete={deleteArticle}
        onUpdate={updateArticle}
      />
    </div>
  );
}