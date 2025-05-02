import React, { useState, useEffect } from "react";
import Image from "../../assets/trump.png";

const categories = [
  { name: "Cryptomonnaies", query: "cryptomonnaies" },
  { name: "Market Trends", query: "bitcoin market" },
  { name: "Blockchain Tech", query: "blockchain" },
  { name: "Altcoins", query: "altcoins" },
  { name: "Slashing", query: "Slashing" },
];

const Category = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const allArticles = [];
        for (const cat of categories) {
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(cat.query )}&apiKey=f2334822c1a34f24b840c9536d0285d0`);
          const data = await response.json();
          allArticles.push(...data.articles);
        }
        setArticles(allArticles);
        setFilteredArticles(allArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchAllNews();
  }, []);

  const handleCategoryClick = (query) => {
    setActiveCategory(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 text-emerald-700">
        Bitcoin News
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.query}
            onClick={() => handleCategoryClick(cat.query)}
            className={`px-5 py-2.5 rounded-full font-medium shadow-sm transition-colors ${
              activeCategory === cat.query
                ? "bg-emerald-700 text-white"
                : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <img
              src={article.urlToImage ? article.urlToImage : Image}
              alt="thumbnail"
              onError={(e) => (e.target.src = Image)}
              className="w-full h-40 object-cover"
            />

            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-emerald-800 mb-2 line-clamp-2">
                {article.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.description}</p>
              <a
                href={article.url}
                className="self-start bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
