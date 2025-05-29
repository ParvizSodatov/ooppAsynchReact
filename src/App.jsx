import axios from "axios";
import { Component } from "react";
import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { THEME_ID } from "@mui/material";


export default class App extends Component{

  
  render(){

    return <>
    <Data/>
    </>
  }
}
class Data extends Component{
  constructor(props){
    super(props)
    this.state={data:[], openAdd:false,addname:"",addCity:'',addStatus:'',openEdit:false,editname:"",editCity:'',editStatus:'',idx:null}
  }

getData=async()=>{
  try {
    const {data}=await axios.get('https://67fcfd583da09811b1744019.mockapi.io/fake')
    this.setState(({data:data}))
  } catch (error) {
    console.log(error);
  }
}
  handleAddClickOpen = () => {
    this.setState({openAdd:true});
  };
 handleAddClose = () => {
    this.setState({openAdd: false});
  };

  handleEditClickOpen = (el) => {
    this.setState({
      openEdit:true,
      editname:el.name,
      editCity:el.city,
      editStatus:el.status,
       idx:el.id
    });
        

  };

handleEdit=async()=>{
  try {
  await axios.put(`${'https://67fcfd583da09811b1744019.mockapi.io/fake'}/${this.state.idx}`,{
name:this.state.editname,
id:this.state.idx,
city:this.state.editCity,
status:this.state.editStatus
  })
  this.getData()
  } catch (error) {
    console.log(error);
    
  }
}
 
 handleEditClose = () => {
    this.setState({openEdit: false});
  };

  // delete
  handleDelete=async(id)=> {
  try {
    await axios.delete(`${'https://67fcfd583da09811b1744019.mockapi.io/fake'}/${id}`)
    this.getData()
  } catch (error) {
    console.log(error);
    
  }
}

handleAdd=async()=>{
  try {
    await axios.post("https://67fcfd583da09811b1744019.mockapi.io/fake",{
      name:this.state.addname,
      id:Date.now(),
        status:this.state.addStatus,
        city:this.state.addCity,
    })
    this.getData()
    this.handleAddClose()
  } catch (error) {
    console.log(error);
    
  }
}




componentDidMount(){
  this.getData()
}

render(){
    return <>
    <div style={{display:'flex',justifyContent:'space-around',marginTop:'50px'}}>
       <Button variant="outlined" onClick={this.handleAddClickOpen}>
      
       +Add User

      </Button>
    </div>
<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>City</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
  {this.state.data.map((el)=>(
  <tr key={el.id}>
<td style={{textAlign:'start'}}>{el.id}</td>
<td style={{textAlign:'start'}}>{el.name}</td>
<td style={{textAlign:'start'}}>{el.city}</td>
<td style={{textAlign:'start'}}>{el.status?'Active':'Inactive'}</td>
<td><div className="action">
  <button style={{backgroundColor:'red',color:'white',padding:'5px'}} onClick={()=>this.handleDelete(el.id)}>Delete</button>
   <button style={{backgroundColor:'blue',color:'white',padding:'5px 15px'}} onClick={()=>this.handleEditClickOpen(el)}>Edit</button>
    <button style={{backgroundColor:'green',color:'white',padding:'5px 15px'}}>Info</button>
  </div></td>
  </tr> 
  ))}
</tbody>

</table>

{/* AddModal */}
      <Dialog
        open={this.state.openAdd}
        onClose={this.handleAddClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              this.handleAddClose();
            },
          },
        }}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={this.state.addname}
            onChange={(e)=>this.setState({addname:e.target.value})}
            label="Add Name"
            type="text"
            fullWidth
            variant="standard"

          />


           <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="City"
            value={this.state.addCity}
            onChange={(e)=>this.setState({addCity:e.target.value})}
            label="Add City"
            type="text"
            fullWidth
            variant="standard"
          />

          <select name="" id=""
           value={this.state.addStatus}
            onChange={(e)=>this.setState({addStatus:e.target.value})}
          >
            <option value="Inactive">Inctive</option>
             <option value="active">Active</option>

          </select>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAddClose}>Cancel</Button>
          <Button type="submit" onClick={this.handleAdd}>Add</Button>
        </DialogActions>

      </Dialog>







{/* editModal */}
      <Dialog
        open={this.state.openEdit}
        onClose={this.handleEditClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              this.handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={this.state.editname}
            onChange={(e)=>this.setState({editname:e.target.value})}
            label="Edit Name"
            type="text"
            fullWidth
            variant="standard"

          />

           <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="City"
            value={this.state.editCity}
            onChange={(e)=>this.setState({editCity:e.target.value})}
            label="Edit City"
            type="text"
            fullWidth
            variant="standard"
          />

          <select name="" id=""
           value={this.state.editStatus}
            onChange={(e)=>this.setState({editStatus:e.target.value})}
          >
            <option value="Inactive">Inctive</option>
             <option value="active">Active</option>

          </select>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleEditClose}>Cancel</Button>
          <Button type="submit" onClick={this.handleEdit}>Save</Button>
        </DialogActions>

      </Dialog>

  </>
}

}

