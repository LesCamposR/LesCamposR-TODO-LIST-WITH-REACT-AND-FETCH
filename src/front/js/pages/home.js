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

  const remove = async (i) => {
    let arrTemp = tasks.filter((item, index) => {
      return index != i;
    });

    let { respuestaJson, response } = await actions.useFetch(
      "/todos/user/LesCampos",
      arrTemp,
      "PUT"
    );
    if (response.ok) {
      setTasks(arrTemp);
    } else {
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>{store.usuario.msg}</h1>
      <br />
      <div className="text-center mt-5">
        <h1>List of tasks:</h1>
        <br />
        {tasks && tasks.length > 0 ? (
          <lu className="list-group list-group-flush col-6">
            {tasks.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  {item.label}
                  <button
                    type="button"
                    class="btn btn-outline-danger" //Agrego un botón para eliminar el todo
                    onClick={() => {
                      remove(index); //este botón ejecuta esta acción y le pasamos el índice
                    }}
                  >
                    x
                  </button>
                </li>
              );
            })}
          </lu>
        ) : (
          <>
            <h3>No Tasks to do.</h3>
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
