import React from "react";
import {useState, useEffect} from 'react'
import EditModal from './EditModal'

const DataTable = () => {
  const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('http://localhost:8090/get-all')
         .then((response) => response.json())
         .then((res) => {
            //console.log(res.payload.output);
            setPosts(res.payload.output);
         })
         .catch((err) => {
            //console.log(err.message);
         });
   }, []);

   const deletePost = async (id) => {
    await fetch(`http://localhost:8090/delete-data`, {
       method: 'DELETE',
       body: JSON.stringify({
           id: id,
      }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
      },
       
    }).then((response) => {
       if (response.status === 200) {
          setPosts(
             posts.filter((post) => {
                return post.id !== id;
             })
          );
       } else {
          return;
       }
    });
    };

return(
 <div className="Data">
  <div className="table-responsive mt-5">
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Sectors</th>
          <th scope="col">Terms</th>
          <th scope="col" className='text-center'>Edit</th>
          <th scope="col" className='text-center'>Delete</th>
        </tr>
      </thead>
   <tbody>
     {posts.map((post) => {
       return (
        <tr>
           <th scope="row">{post?.id}</th>
           <td>{post?.name}</td>
           <td>{post?.sector}</td>
           <td>{post?.terms}</td>
           <td className='text-center'>
           <EditModal key={post.id}/></td>
           <td className='text-center'>
           <i className="fa fa-trash" aria-hidden="true" style={{color: 'red'}}
              onClick={() => deletePost(post.id)}></i>
           </td>
        </tr>
    )
  })}
   </tbody>
  </table>
 </div>
</div>
)
}
export default DataTable;