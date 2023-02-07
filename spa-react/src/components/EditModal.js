import React from "react";
import {useState} from 'react'
import { Modal } from 'react-bootstrap';

const EditModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="Data">
        <i className="fa fa-pencil-square-o" aria-hidden="true" style={{color: 'blue'}} onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <div className="modal-body">
        <div className='row'>
        <div className='col-2'>
          <label>Name</label>
        </div>
        <div className='form-group col'>
       <input type="text" className="form-control" style={{ borderRadius: '2px'}}
       />
      </div>
        </div>
        <div className='row'>
        <div className='form-group col-2 mt-2'>
      <label>Sectors</label>
      </div>
      <div className='form-group col mt-2'>
      <select className="form-select">
         <option>Select Options</option>
         <option>Construction Metarial</option>
         <option>Electronic & Optics</option>
         <option>Beverage</option>
         <option>Fish & fish Products</option>
       </select>
      </div>
        </div>
        <div className="form-group form-check mt-3 mb-4">
           <input type="checkbox" className="form-check-input" id="exampleCheck1" />
           <label className="form-check-label" style={{fontWeight: 'bold'}}>Accept To Terms</label>
         </div>
        </div>
        <div className="modal-footer">
          <button type="button" className='btn btn-primary' onClick={handleClose} 
          style={{ borderRadius: '2px', border: '1px solid #0d4a85', background: '#30689e'}}>
            Save Changes
          </button>
        </div>
      </Modal>
        </div>
    )
}
export default EditModal;