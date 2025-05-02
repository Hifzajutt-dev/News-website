import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Image from "../../assets/trump.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_KEY = "f2334822c1a34f24b840c9536d0285d0";
const ARTICLES_PER_PAGE = 15;

export default function Home() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://newsapi.org/v2/everything?q=${query || "bitcoin"}&apiKey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.articles || []);
        setCurrentPage(1); 
      } catch (error) {
        console.error("Error fetching news", error);
        setError("Failed to load news. Please try again later.");
      }
    };

    fetchData();
  }, [query]);

  const totalPages = Math.ceil(news.length / ARTICLES_PER_PAGE);
  const currentArticles = news.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const getAllPages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-emerald-700">
        {query ? `Results for "${query}"` : "Latest News"}
      </h2>

     
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentArticles.length === 0 ? (
          <div className="text-gray-500 col-span-full">
            No news found for "{query}"
          </div>
        ) : (
          currentArticles.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
            >
              <img
                src={item.urlToImage ? item.urlToImage : Image}
                alt="thumbnail"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-emerald-700 mb-2 line-clamp-2">
                  {item?.title || "No title"}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item?.description || "No description available."}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition"
                >
                  Read more
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
       
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md border ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "hover:bg-emerald-100 border-emerald-300 text-emerald-700"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

        
          {getAllPages().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-md font-medium ${
                currentPage === pageNum
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-emerald-400 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md border ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "hover:bg-emerald-100 border-emerald-300 text-emerald-700"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
