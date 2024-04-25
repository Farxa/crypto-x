import { useState, useEffect } from "react";
import api from "./api";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAssets()
      .then((assets) => setAssets(assets))
      .finally(() => setIsLoading(false));
  }, []);
  console.log(assets);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {assets.map((asset) => (
            <li key={asset.id}>
              <span>{asset.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
