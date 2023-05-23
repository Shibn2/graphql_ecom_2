import { useMutation } from "@apollo/client";
import { useState } from "react";
import insertProductData from "../graphql/mutation";

const ProductDataForm = () => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: "",
    outOfStock: "",
  });

  const [insertProduct, { data, loading, error }] =
    useMutation(insertProductData);

  const fieldChangeHandler = (e) => {
    console.log("e.target", e.target.checked);
    const name = e?.target?.name;
    const value =
      e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value;
    const updatedData = {};
    console.log("name-->", name, "value-->", value);
    updatedData[name] = value;
    setProductInfo((prevState) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(" on product submission productInfo ========>", productInfo);
    insertProduct({
      variables: {
        title: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        outOfStock: productInfo.outOfStock,
      },
    });
  };

  return (
    <div>
      <label>
        Product title:
        <input
          name="title"
          type="text"
          onChange={fieldChangeHandler}
          placeholder="Product title"
        />
      </label>
      <label>
        Product description:
        <input
          name="description"
          type="text"
          onChange={fieldChangeHandler}
          placeholder="Product title"
        />
      </label>
      <label>
        Product price:
        <input
          name="price"
          type="text"
          onChange={fieldChangeHandler}
          placeholder="Product title"
        />
      </label>
      <label>
        Product stock:
        <input
          name="outOfStock"
          type="checkbox"
          onChange={fieldChangeHandler}
          placeholder="Product title"
        />
      </label>
      <button onClick={(e) => submitHandler(e)}>Send Product Data</button>
      {loading && <p> Submitting...</p>}
      {error && <p> Error submitting product data...</p>}
      {data && <p> Last entry successfully submitted...</p>}
    </div>
  );
};

export default ProductDataForm;
