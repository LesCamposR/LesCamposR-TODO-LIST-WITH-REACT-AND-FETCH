import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import lesPhoto from "../../img/DJI_0008.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/todos/user/${user}`
      );
      if (response.ok) {
        setTasks(respuestaJson);
      }
    };
    cargaDatos();
  }, [user]);

  useEffect(() => {}, [tasks]);

  const remove = async (i) => {
    let arrTemp = tasks.filter((item, index) => {
      return index != i;
    });

    let { respuestaJson, response } = await actions.useFetch(
      `/todos/user/${user}`,
      arrTemp,
      "PUT"
    );
    if (response.ok) {
      setTasks(arrTemp);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="text-center mt-5">
      <br />

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
