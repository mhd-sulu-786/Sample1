import React, { useState, useEffect } from 'react';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import './App.css';
import 'react-bootstrap';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post("https://sample1-ui55.onrender.com/submit", { name, age, email });
      alert("Success");
      setName('');
      setAge('');
      setEmail('');
    } catch (error) {
      alert('Error');
    }
  }

  useEffect(() => {
    axios.get("https://sample1-ui55.onrender.com/datas")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='App d-flex mt-5 justify-content-center align-items-center text-center text-white flex-column'>
      <h3>Form</h3>
      <Stack spacing={2} sx={{ border: '3px solid skyblue', borderRadius: '10px', padding: '7px' }}>
        <Input size="sm" type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input size="md" type='number' placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <Input size="md" type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Stack>
      {data&&<Button onClick={() => setShow(!show)} className='mt-2' variant="secondary">Show Data</Button>}
      {show && data&&(
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
           
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
              
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
