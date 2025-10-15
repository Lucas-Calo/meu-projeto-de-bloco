import React, { useState, useEffect } from 'react';
import './CitacaoDoDia.css';

const CitacaoDoDia = () => {
  const [citacao, setCitacao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitacao = async () => {
      try {
        // --- MUDANÇA: Nova URL da API, as em português não estavam funcionando corretamente.---
        const response = await fetch('https://dummyjson.com/quotes/random');
        
        const data = await response.json();

        setCitacao({ texto: data.quote, autor: data.author });

      } catch (error) {
        console.error("Erro ao buscar citação:", error);
        setCitacao({ texto: "A persistência realiza o impossível.", autor: "Provérbio Chinês" });
      } finally {
        setLoading(false);
      }
    };

    fetchCitacao();
  }, []);

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