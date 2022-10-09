import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProblems } from '../../Store/Action/fetchDetails';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../helpers/Loader/Loader';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'code', headerName: 'code', width: 100 },
    { field: 'Problems', headerName: 'Problems' , sortable:false,flex:2},
    { field: 'ContestID', headerName: 'Contest ID', flex: 1 ,sortable:false },   
    {field:"Route",
    renderCell:(cellValues)=>{
      console.log(cellValues.row.uri)
      return <a href={`${cellValues.row.uri}`}  target="_blank"> Link</a>
    }
  }
    
  ];
  
  const rows = [
    { id: 1, Problems: 'Snow', ContestID: 'Jon', },
    { id: 2, Problems: 'Lannister', ContestID: 'Cersei', },
    { id: 3, Problems: 'Lannister', ContestID: 'Jaime', },
    { id: 4, Problems: 'Stark', ContestID: 'Arya', },
    { id: 5, Problems: 'Targaryen', ContestID: 'Daenerys', },
    { id: 6, Problems: 'Melisandre', ContestID: null, },
    { id: 7, Problems: 'Clifford', ContestID: 'Ferrara', },
    { id: 8, Problems: 'Frances', ContestID: 'Rossini', },
    { id: 9, Problems: 'Roxie', ContestID: 'Harvey', },
  ];
function Home() {
const [text, setText] = useState("Fefer_Ivan")
    const dispatch = useDispatch()
    const {prob,probLoader}=useSelector(state=>state.fetchedProblem)
   const  handleCellClick=(param,event)=>{
    console.log(event.stopPropagation());
    event.stopPropagation();
    
    }
    const handleRowClick = (param, event) => {
      event.stopPropagation();
    };
  return (
    <div style={{display:'flex',flexDirection:"column", alignItems:"center"}}>
        

        <div style={{padding:'2vmax',width:"40%",display:'flex',justifyContent:"space-between"}}>
        <TextField style={{width:"80%"}} placeholder={"Enter CodeChef User id"} 
        onChange={(val=>setText(val.target.value))} 
        value={text}
        />
        <Button variant="contained" size="small"  onClick={()=>{
            fetchProblems(text)
        
         } }>
          search
        </Button>
        </div>
        <div style={{height:"65vh",width:"100%"}}>

            {/* <div className="row" style={{}}> */}
            {prob.length>0?
            <DataGrid
            rows={prob}
            getRowId={(row) =>row.id}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(selection)=>console.log(selection)}
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />: <div></div>}
            {/* </div> */}
        </div>
        <Button variant="contained" size="small" onClick={()=>{
            fetchProblems({payload:"Fefer_Ivan", dispatchFunction:dispatch})
        
         }

            }>
          ADD 
        </Button>
        {probLoader && <Loader/>}
    </div>
  )
}

export default Home