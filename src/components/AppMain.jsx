import React, { useState, useEffect } from "react";
import BlogForm from "./BlogForm/BlogForm";
import BlogList from "./BlogList/BlogList";

export default function AppMain() {
  const [articles, setArticles] = useState([]);
  const [articlesCalled, setArticlesCalled] = useState([]);

  function fetchData(url = 'http://localhost:3002/posts') {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      // aggiungo un id univuoco per gestirli in bloglist
      const addIdToArticles = data.data.map((article, index) => ({
        ...article,
        id: Date.now() + index
      }))
      console.log(addIdToArticles);
      setArticlesCalled(addIdToArticles)
    })
    .catch((error) => console.error("Errore nella fetch:", error));
  }

  // Esegui fetchData quando il componente è montato
  useEffect(() => {
    fetchData();
  }, []); 


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
        articlesCalled={articlesCalled}
        articles={articles}
        onDelete={deleteArticle}
        onUpdate={updateArticle}
      />
    </div>
  );
}