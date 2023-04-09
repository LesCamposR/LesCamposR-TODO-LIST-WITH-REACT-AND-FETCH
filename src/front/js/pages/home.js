import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import lesPhoto from "../../img/DJI_0008.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        "/todos/user/LesCampos"
      );
      if (response.ok) {
        setTasks(respuestaJson);
      }
    };
    cargaDatos();
  }, []);

  useEffect(() => {}, [tasks]);

  return (
    <div className="text-center mt-5">
      <h1>{store.usuario.msg}</h1>
      <br />
      <div className="text-center mt-5">
        <h1>List of tasks:</h1>
        <br />
        {tasks && tasks.length > 0 ? (
          <lu>
            {tasks.map((item, index) => {
              return <li key={index}>{item.label}</li>;
            })}
          </lu>
        ) : (
          <>
            <h3>No Tasks to do</h3>
          </>
        )}
      </div>

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
