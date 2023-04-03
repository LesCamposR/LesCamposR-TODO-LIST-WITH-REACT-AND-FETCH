import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/home.css";


const contactCard = () => {
    const { store, actions } = useContext(Context)
    const [lista, setLista] = useState()

    useEffect(() => {
        let funcionCarga = async () => {
            let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/agenda/LesCampos_agenda")
            console.log(respuestaJson)
            setLista(respuestaJson)
        }
        funcionCarga()

    }, [])

    useEffect(() => { }, [lista])

    return (
        <>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {lista && lista.length > 0 ? <>
                        {lista.map((item, index) => {
                            return (
                                <li key={index} className="list-group-item d-flex mt-2 mb-2">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" className="rounded rounded-circle ms-5 me-5" style={{ width: "15%" }} />
                                    <div className="d-flex flex-column align-items-start col-8">
                                        <h5>{item.full_name}</h5>
                                        <div className="d-flex align-items-center text-secondary my-1">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span className="ms-3 fw-bold">{item.address}</span>
                                        </div>
                                        <div className="d-flex align-items-center text-secondary my-1">
                                            <i className="fa-solid fa-phone-flip"></i>
                                            <span className="ms-3" style={{ fontSize: "14px" }}>{item.phone}</span>
                                        </div>
                                        <div className="d-flex align-items-center text-secondary my-1">
                                            <i className="fa-solid fa-envelope"></i>
                                            <span className="ms-3" style={{ fontSize: "12px" }}>{item.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={"/edit-contact/" + item.id}><i className="fa-solid fa-pencil"></i></Link>
                                        <i className="fa-solid fa-trash-can ms-4" onClick={async () => {
                                            let deleteID = item.id;
                                            Swal.fire({
                                                title: "Are you sure?",
                                                text: "Think it twice!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#30c0d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Yes, delete it!",
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    let { respuestaJson, response } = await actions.useFetch(`/apis/fake/contact/${deleteID}`, null, "DELETE");
                                                    console.log(response);
                                                    if (!response.ok) {
                                                        Swal.fire("Error", response.statusText, "error");
                                                        return;
                                                    }
                                                    // Create a new array with the same elements as lista
                                                    let newList = lista.slice();
                                                    // Use filter method to remove the element with the specified ID
                                                    newList = newList.filter(item => item.id !== deleteID);
                                                    // Update the lista state with the new array
                                                    setLista(newList);
                                                    Swal.fire("Deleted!", "Contact deleted.", "success");
                                                }
                                            });
                                        }}></i>
                                    </div>

                                </li>
                            )
                        })}
                    </> : (
                        <li className="list-group-item text-center">
                            <h1>No contacts to show</h1>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default contactCard;