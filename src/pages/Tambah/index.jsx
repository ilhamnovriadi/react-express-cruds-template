import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import "./index.scss";
const URL = process.env.REACT_APP_RESTAPI;

const Tambah = () => {
  const history = useHistory();
  const [nama_merek, setnama_merek] = useState("");
  const [harga, setharga] = useState("");
  const [stok, setstok] = useState("");
  const [active, setactive] = useState(false);

  const addProduct = () => {
    const data = {
      nama_merek,
      harga: parseInt(harga),
      stok: parseInt(stok),
      active,
    };

    axios
      .post(URL + "/product", data)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            onChange={(e) => setnama_merek(e.target.value)}
            label="Nama"
            value={nama_merek}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            onChange={(e) => setharga(e.target.value)}
            value={harga}
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            onChange={(e) => setstok(e.target.value)}
            value={stok}
          />
          <Input
            onChange={(e) => setactive(e.target.checked)}
            checked={active}
            name="status"
            type="checkbox"
            label="Active"
          />
          <button onClick={addProduct} className="btn btn-primary">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tambah;
