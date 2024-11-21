import React, { useState, useEffect } from "react";
import BlogForm from "./BlogForm/BlogForm";
import BlogList from "./BlogList/BlogList";

export default function AppMain() {
  // const [articles, setArticles] = useState([]);
  const [articlesCalled, setArticlesCalled] = useState([]);

  function fetchData(url = 'http://localhost:3002/posts') {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // aggiungo un id univuoco per gestirli in bloglist
        const addIdToArticles = data.data.map((article, index) => ({
          ...article,
          id: Date.now() + index,
          status: 'draft'
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

  // chiamata per eliminare il post
  const deleteArticleCalled = async (title) => {
    try {
      const response = await fetch(`http://localhost:3002/posts/${title}`,
        {
          method: "DELETE"
        })

      if (!response.ok) {
        throw new Error('Errore nell\'eliminazione del post')
      }

      console.log(`Post con titolo "${title}" eliminato con successo.`);

      // filtro gli articoli rimuovendo quello indicato
      setArticlesCalled((prevArticles) => prevArticles.filter((article) => article.title !== title))
    
    } catch (error) {
      console.error('Errore durante l\'eliminazione del post:', error);
      alert('Errore durante l\'eliminazione del post. Riprova.');
    }

  };

  // Invia la richiesta PUT per aggiornare l'articolo
  const updateArticle = async (title, updatedArticle) => {
    try {
        const response = await fetch(`http://localhost:3002/posts/${title}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArticle), // Dati da aggiornare
        });

        if (!response.ok) {
            throw new Error(`Errore nell'aggiornamento del post: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Post aggiornato con successo:', data);

        // Dopo l'aggiornamento, aggiorna la lista degli articoli
        setArticlesCalled((prevArticles) =>
            prevArticles.map((article) =>
                article.title === title ? { ...article, ...updatedArticle } : article
            )
        );

    } catch (error) {
        console.error('Errore durante l\'aggiornamento del post:', error);
        alert('Errore durante l\'aggiornamento del post. Riprova.');
    }
};


  return (
    <div className="app">
      <h1>React Blog Form</h1>
      <BlogForm />
      <BlogList
        articlesCalled={articlesCalled}
        onDelete={deleteArticleCalled}
        onUpdate={updateArticle}
      />
    </div>
  );
}