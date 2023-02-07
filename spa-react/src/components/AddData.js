import React from 'react'
import {useState, useEffect} from 'react'
import DataTable from './DataTable'

const AddData = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [posts, setPosts] = useState([]);
  const [terms, setTerms] = useState([]);

  const addPosts = async (name, sector, terms) => {
    await fetch('http://localhost:8090/create', {
       method: 'POST',
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
  addPosts(name, sector, terms);
};  

return (
  <div className='AddData'>
    <div className='container'> <br />
        <h4>Please enter your name and pick the Sectors 
        you are currently involved in.</h4>
         <form onSubmit={handleSubmit}>
           <div className='row mt-5'>
             <div className='col-2'>
               <label style={{fontWeight: 'bold'}}>Name</label>
                 </div>
                   <div className='form-group col-3'>
       <input type="text" className="form-control"  name="name" value={name}
       onChange={(e) => setName(e.target.value)}
       style={{ borderRadius: '2px', width: '23rem'}} placeholder="Enter Name" required
       />
      </div>
     </div>
     <div className='row mt-2'>
      <div className='col-2'>
      <label style={{fontWeight: 'bold'}}>Sectors</label>
      </div>
      <div className='form-group col'>
      <select className="form-select" value={sector} onChange={(e) => setSector(e.target.value)}  required
      style={{ borderRadius: '2px', width: '23rem'}}>
         <option >Select Options</option>
         <option value="Construction Metarial">Construction Metarial</option>
         <option value="Electronic & Optics">Electronic & Optics</option>
         <option value="Beverage">Beverage</option>
         <option value="Fish & fish Products">Fish & fish Products</option>
       </select>
      </div>
     </div>
       <div className="form-group form-check mt-3 mb-4">
           <input type="checkbox" name="tnc" onChange={(e) => setTerms(e.target.value)}
           className="form-check-input" id="exampleCheck1" />
           <label className="form-check-label" style={{fontWeight: 'bold'}}>Accept To Terms</label>
         </div>
         <div className="form-group">
         <button style={{ borderRadius: '2px', border: '1px solid #0d4a85', background: '#30689e'}} 
              type="submit" className='btn btn-primary'>Submit</button>
         </div>
     </form>
       <DataTable />
 </div>
</div>
    )
}
export default AddData;