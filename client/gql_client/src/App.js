import "./App.css";
import { useQuery } from "@apollo/client";
import { productData } from "./graphql/query";
import ProductList from "./components/productList";
import ProductDataForm from "./components/form";

function App() {
  const {
    loading,
    error,
    data: { Products = [] } = {},
    refetch,
  } = useQuery(productData, { fetchPolicy: "cache-first" });
  console.log("Products-->", Products);

  const handleRefresh = () => {
    console.log("hit refresh");
    refetch();
  };
  return (
    <div className="App">
      <h3>App Client</h3>
      <ProductDataForm />
      {
        <>
          {loading && error ? (
            <h2>Loading...</h2>
          ) : (
            <ProductList productList={Products} />
          )}
        </>
      }
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
