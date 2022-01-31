import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
const URL = process.env.REACT_APP_RESTAPI;

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [nama_merek, setnama_merek] = useState("");
  const [harga, setharga] = useState("");
  const [stok, setstok] = useState("");
  const [active, setactive] = useState(false);

  const putProduct = () => {
    const data = {
      nama_merek,
      harga: parseInt(harga),
      stok: parseInt(stok),
      active,
    };

    axios
      .put(URL + "/product/" + id, data)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const getProduct = () => {
    axios
      .get(URL + "/product/" + id)
      .then((res) => {
        setnama_merek(res.data.nama_merek);
        setharga(res.data.harga);
        setstok(res.data.stok);
        setactive(res.data.active);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
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
            name="status"
            type="checkbox"
            label="Active"
            onChange={(e) => setactive(e.target.checked)}
            checked={active}
          />
          <button onClick={putProduct} className="btn btn-primary">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
