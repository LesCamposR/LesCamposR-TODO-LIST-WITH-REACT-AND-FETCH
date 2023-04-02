import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    const [refresh, setRefresh] = useState(false)
    const [estadoTemporal, setEstadotemporal] = useState({})

    useEffect(() => {
        let funcionCarga = async () => {
            let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/agenda/agenda_de_antonio", null)
            console.log(respuestaJson)
            setLista(respuestaJson)
        }
        funcionCarga() //aquí llamo a la función asíncrono

    }, [refresh])

    useEffect(() => { }, [lista, nombre])


    return (<div>
        Contactos
        <br />
        <Link to="/add-contact">Add New Contact</Link>
        <br />
        <input type="text" placeholder="nombreNuevo" onChange={(e) => setNombre(e.target.value)} />
        <br />
        <ul>
            {lista && lista.length > 0 ? <>
                {lista.map((item, index) => {
                    return (
                        <li key={index}>
                            {item.full_name} - {item.email} - {item.phone}
                            <button
                                className="btn btn-warning"
                                button="button"
                                onClick={() => {
                                    if (nombre == "") {
                                        alert("Please add a new name")
                                        return
                                    }
                                    actions.editContact(index, nombre)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => { actions.deleteContact(index) }}>
                                Delete Contact
                            </button>
                        </li>
                    )
                })}
            </> : <>No contacts available</>}
        </ul>
    </div>)
}

export default Contactos;