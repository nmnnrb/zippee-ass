import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Cards = ({ searchQuery = "", page = 1 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const cardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cardData();
  }, [page]);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filtered = normalizedSearch
    ? data.filter((c) => c.name.toLowerCase().includes(normalizedSearch))
    : data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 animate-pulse rounded-lg border border-gray-300 shadow overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300" />
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
              </div>
            </div>
          ))
        ) : filtered.length > 0 ? (
          filtered.map((character, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-500 shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500 hover:border-2 hover:shadow-blue-200 hover:cursor-pointer transition duration-300"
              onClick={() => {
                setSelectedCharacter(character);
                setModalOpen(true);
              }}
            >
              <img
                src={`https://picsum.photos/seed/${character.name}/200/200`}
                alt="No image available"
                className="w-full h-48 object-cover"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvs_ljZ5vfeak6Ml8H5hKjA91uKQPz1DVbXQ&s")
                }
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {character.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700 py-12">
            No results found for "{searchQuery}".
          </div>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        character={selectedCharacter}
      />
    </div>
  );
};

export default Cards;
