import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import lesPhoto from "../../img/DJI_0008.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {}, [store.usuario]);

  return (
    <div className="text-center mt-5">
      <h1>{store.usuario.msg}</h1>
      <p>
        <img width={950} src={lesPhoto} />
      </p>
      <button
        type="button"
        onClick={() => {
          actions.login();
        }}
      >
        Login
      </button>
    </div>
  );
};
