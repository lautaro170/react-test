import { useState, useEffect } from 'react'
import './App.css'



function IssueRow({issue}){

  return(
  <tr>
    <td>  
      <span style={{fontSize:'22px', fontWeight:'bold'}}>{issue.title}</span> <br/>
      <span style={{fontSize:'14px', fontWeight:'lighter'}}>#{issue.number} Opened on {new Date(issue.created_at).toLocaleDateString("en-US")} by {issue.user.login} </span> 
    </td>

    
  </tr>
  );

}



function App() {
  const [data, setData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('open'); 
  
  
  useEffect( () => { 
    fetch('https://api.github.com/repos/berzniz/react-overdrive/issues')
      .then(response => response.json())
      .then(data => {
        let fdata = data.filter(issue => issue.pull_request == undefined); 
        setData(fdata)
        setFormattedData(fdata);
      })
  }, [])

  useEffect( () =>{
    let newData = data?.filter( issue => issue.title.includes(search) && (issue.state === radio || radio === 'all'));
    setFormattedData(newData);
  }, [radio, search])

  if(!formattedData) return null;
  return (
    <div style={{margin:'30px'}}>

    <div>
      Open
      <input
          id="open"
          value="open"
          name="state"
          type="radio"
          onChange={(e) => setRadio(e.target.value)}
          style={{marginRight:'10px'}}
        />
        Closed
        <input
          id="closed"
          value="closed"
          name="state"
          type="radio"
          onChange={(e) => setRadio(e.target.value)}
          style={{marginRight:'10px'}}


        />
        All
        <input
          id="all"
          value="all"
          name="state"
          type="radio"
          onChange={(e) => setRadio(e.target.value)}
        />
    </div>

    <input type="text" name="search" placeholder='search' value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
    <table>
      <thead></thead>
      <tbody>
      {
        formattedData.map(issue => {
          return <IssueRow key={issue.number} issue={issue}/>
        })
      }
      </tbody>

    </table>
  </div>
  )
}

export default App
