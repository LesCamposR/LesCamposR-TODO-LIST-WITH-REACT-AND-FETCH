import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/home.css";

const EditContact = (props) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [contacto, setContacto] = useState();

    useEffect(() => {
        let funcionCargaContacto = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/apis/fake/contact/${params.contactID}`)
            console.log(respuestaJson)
            setContacto(respuestaJson)
            setFullName(respuestaJson.full_name)
            setEmail(respuestaJson.email)
            setAddress(respuestaJson.address)
            setPhone(respuestaJson.phone)
            setIsLoaded(true)
        }
        funcionCargaContacto()

    }, [])

    useEffect(() => { }, [contacto])

    const handleSubmit = async () => {
        const editedContact = {
            full_name: fullName,
            email,
            phone,
            address,
            agenda_slug: "LesCampos_Agenda",
        };

        let { respuestaJson, response } = await actions.useFetch(`/apis/fake/contact/${params.contactID}`, editedContact, "PUT");
        if (!response.ok) {
            console.log(response);
            Swal.fire("Error", "There was an error, please carefully review the information and try again", "error");
            return;
        }

        setContacto(editedContact)

        Swal.fire({
            position: "center",
            icon: "success",
            title: "You have edited the contact",
            showConfirmButton: true,
        });
    };

    return (
        <div className="container mt-4 bg-light p-3">
            <div className="d-flex align-items-center">
                <h1>Edit Contact: {isLoaded && contacto.full_name}</h1>
                <Link to="/"><button type="button" className="btn btn-primary m-3">Go Back</button></Link>
            </div>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="full-name" className="form-label">Full Name:</label>
                    <input type="text" className="form-control" id="full-name" name="full-name" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-12 d-flex align-items-end justify-content-center">
                    <button type="button" className="btn btn-primary w-50 mt-4" onClick={handleSubmit}
                    >Edit</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

EditContact.propTypes = {
    match: PropTypes.object
};