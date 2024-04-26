import { useState, useEffect } from "react";
import api from "./api";
import AssetsTable from "./components/AssetsTable";

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

  return (
    <div>{isLoading ? <p>Loading...</p> : <AssetsTable assets={assets} />}</div>
  );
}

export default Home;
