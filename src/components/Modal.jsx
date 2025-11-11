import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, character }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    // fetch homeworld details when character changes
    if (character && character.homeworld) {
      setHomeworld(null);
      fetch(character.homeworld)
        .then((res) => res.json())
        .then((data) => setHomeworld(data))
        .catch(() => setHomeworld(null));
    }
  }, [character]);

  if (!isOpen || !character) return null;

  // Format date as dd-MM-yyyy
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    } catch (e) {
      return dateStr;
    }
  };

  const formatNumber = (value) => {
    if (value == null || value === "unknown") return "Unknown";
    return Number(value).toLocaleString();
  };

  const heightMeters = (h) => {
    if (!h || h === "unknown") return "Unknown";
    const num = Number(h);
    if (Number.isNaN(num)) return h;
    return (num / 100).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center pt-6 md:pt-0 overflow-auto bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 md:mx-0 p-6 md:p-8 relative">
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 hover:cursor-pointer text-gray-600 hover:text-gray-900 text-4xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src={`https://picsum.photos/seed/${character.name}/300/300`}
              alt={character.name}
              className="rounded-lg w-48 h-48 object-cover shadow-lg"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              {character.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {character.gender ?? "Unknown gender"} •{" "}
              {character.eye_color ?? "-"} eyes • {character.hair_color ?? "-"}{" "}
              hair
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="text-xs text-gray-500">Height</div>
                <div className="text-lg font-medium">
                  {heightMeters(character.height)} m
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="text-xs text-gray-500">Mass</div>
                <div className="text-lg font-medium">
                  {character.mass === "unknown"
                    ? "Unknown"
                    : `${character.mass} kg`}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="text-xs text-gray-500">Date added</div>
                <div className="text-lg font-medium">
                  {formatDate(character.created)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded shadow-sm">
                <div className="text-xs text-gray-500">Films</div>
                <div className="text-lg font-medium">
                  {character.films?.length ?? 0}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-gray-500">Birth year</h3>
              <div className="text-base font-medium">
                {character.birth_year ?? "Unknown"}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-gray-500">Homeworld</h3>
              {homeworld ? (
                <div className="mt-2 bg-white border rounded p-4 shadow-sm">
                  <div className="text-base font-semibold">
                    {homeworld.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Terrain: {homeworld.terrain}
                  </div>
                  <div className="text-sm text-gray-600">
                    Climate: {homeworld.climate}
                  </div>
                  <div className="text-sm text-gray-600">
                    Population: {formatNumber(homeworld.population)}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-500">
                  Loading homeworld...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
