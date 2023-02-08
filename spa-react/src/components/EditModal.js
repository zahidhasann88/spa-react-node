import React from "react";
import {useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap';

const EditModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [posts, setPosts] = useState([]);
    const [terms, setTerms] = useState([]);

    const updatePosts = async (id) => {
      await fetch('http://localhost:8090/update', {
         method: 'PATCH',
         body: JSON.stringify({
            name: name,
            sector: sector,
            terms: false
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => response.json())
         .then((data) => {
            setPosts((posts) => [data, ...posts]);
            setName('');
            setSector('');
            setTerms('');
         })
         .catch((err) => {
            console.log(err.message);
         });
   };
  
   const handleSubmit = (e) => {
    e.preventDefault();
    updatePosts(name, sector, terms);
  };

  useEffect(() => {
    fetch('http://localhost:8090/get-all-sector')
       .then((response) => response.json())
       .then((res) => {
          //console.log(res.payload.output);
          setPosts(res.payload.output);
       })
       .catch((err) => {
          //console.log(err.message);
       });
 }, []);
    return(
        <div className="updateForm">
        <i className="fa fa-pencil-square-o" aria-hidden="true" style={{color: 'blue'}} onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
        <div className="modal-body">
        <div className='row'>
        <div className='col-2'>
          <label>Name</label>
        </div>
        <div className='form-group col'>
       <input type="text" className="form-control" style={{ borderRadius: '2px'}}
              name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
        </div>
        <div className='row'>
        <div className='form-group col-2 mt-2'>
      <label>Sectors</label>
      </div>
      <div className='form-group col mt-2'>
      <select className="form-select" value={sector} onChange={(e) => setSector(e.target.value)}>
      {posts.map((post) => {
           return(
                <option>{post?.name}</option>
                  )
                })}
       </select>
      </div>
        </div>
        <div className="form-group form-check mt-3 mb-4">
           <input type="checkbox" className="form-check-input" id="exampleCheck1" 
            name="tnc" onChange={(e) => setTerms(e.target.value)}
           />
           <label className="form-check-label" style={{fontWeight: 'bold'}}>Accept To Terms</label>
         </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className='btn btn-primary' onClick={handleClose} 
          style={{ borderRadius: '2px', border: '1px solid #0d4a85', background: '#30689e'}}>
            Save Changes
          </button>
        </div>
        </form>
      </Modal>
        </div>
    )
}
export default EditModal;