import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { dollarFormatter, percentFormatter } from "../utils/formatters";

const AssetsTable = ({ assets }) => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const changeSortOrder = () => {
    setSortOrder((sortOrder) => -sortOrder);
  };

  const goToCoin = (id) => {
    console.log("goToCoin", id);
  };

  const filteredAssets = assets.filter((a) =>
    `${a.symbol} ${a.name}`.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const factor = sortOrder === 1 ? 1 : -1;
    return factor * (parseInt(a.rank) - parseInt(b.rank));
  });

  return (
    <div className="p-4">
      <input
        className="w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        id="filter"
        placeholder="Search..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full sm:max-w-screen-xl whitespace-nowrap">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Currency</th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={changeSortOrder}
              >
                Ranking
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Market Cap</th>
              <th className="px-4 py-3 text-left">Change (24hr)</th>
              <th className="px-4 py-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <img
                    className="w-6 h-6"
                    src={`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`}
                    alt={a.name}
                  />
                </td>
                <td className="px-4 py-3">#{a.rank}</td>
                <td className="px-4 py-3">
                  <Link
                    className="text-blue-600 hover:underline"
                    to={`/details/${a.id}`}
                  >
                    {a.name} <span className="text-gray-500">{a.symbol}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">{dollarFormatter(a.priceUsd)}</td>
                <td className="px-4 py-3">{dollarFormatter(a.marketCapUsd)}</td>
                <td
                  className={`px-4 py-3 ${
                    a.changePercent24Hr.includes("-")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {percentFormatter(a.changePercent24Hr)}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => goToCoin(a.id)}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AssetsTable.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      priceUsd: PropTypes.string.isRequired,
      marketCapUsd: PropTypes.string.isRequired,
      changePercent24Hr: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AssetsTable;
