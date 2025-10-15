import React, { useState, useEffect } from 'react';
import './CitacaoDoDia.css';

const CitacaoDoDia = () => {
  const [citacao, setCitacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitacao = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setCitacao({ texto: data.content, autor: data.author });
      } catch (error) {
        console.error("Erro ao buscar citação:", error);
        setCitacao({ texto: "A jornada de mil milhas começa com um único passo.", autor: "Lao Tsé" });
      } finally {
        setLoading(false);
      }
    };

    fetchCitacao();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <div className="citacao-container">
      {loading ? (
        <p>Carregando inspiração...</p>
      ) : (
        <blockquote>
          <p>"{citacao.texto}"</p>
          <footer>— {citacao.autor}</footer>
        </blockquote>
      )}
    </div>
  );
};

export default CitacaoDoDia;