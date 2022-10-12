import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { fetchSavedProbList } from '../../Store/Action/fetchDetails'

function MyProblems() {
  const {savedProbList}=useSelector(state=>state.fetchedProblem)
  const {userDetails}=useSelector(state=>state.authDetails)
  useEffect(() => {
    fetchSavedProbList(userDetails.ref)
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 ,
    renderCell:(cellValues)=> {
      return <p>{cellValues.api.getRowIndex(cellValues.row.id)+1}</p>
    // console.log(cellValues.api.getRowIndex(cellValues.row.id))
  
  }},
    { field: 'Problems', headerName: 'Problems', sortable: false, flex: 2 },
    { field: 'tags', headerName: 'Tags', width: 100 ,flex:2.5,renderCell:(cellValues)=>{

      return <div style={{display:'flex'}}>{cellValues.row.tags.map(elem=><p style={{marginRight:'5px'}}><span style={{color:"#0077b6"}}>{elem}</span> | </p>)}</div>
    }},
    { field: 'ContestID', headerName: 'Contest ID', flex: 1, sortable: false },
    { field: 'Rating', headerName: 'Rating', width: 100 },
    {
      field: "Route",
      renderCell: (cellValues) => {
       
        return <a href={`${cellValues.row.uri}`} target="_blank"> Link</a>
      }
    }
  
  ];

  return (
    <div  style={{ height: "65vh", width: "100%" }}>

   
  { savedProbList.length?
   <DataGrid
   rows={savedProbList}
   getRowId={(row) =>(row.id)}
   columns={columns}
   pageSize={50}
   rowsPerPageOptions={[9]}
   checkboxSelection
 /> : <div></div>}

</div>
  )
}

export default MyProblems