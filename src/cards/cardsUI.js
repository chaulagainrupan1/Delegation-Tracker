import React from 'react';
import {Card} from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './cardStyle.css';


let colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'info',
  'light',
  'dark',
]


// Card UI for the pools
const Card1 = ({pools, history}) => {

  const poolList = pools.length ? pools.map((pool,index) => {

    let colorChoice = colors[index%7] === "dark"? "white":"black";
    
    return(
      <div key={pool.pool_hash}
       style={{padding:16,width:"25%"}}>
        <Card
        bg={colors[index%7]}
        text={colors[index%7] === 'dark' ? "light": "dark"}
        style={{height:"100%",justifyContent:"center"}}>
        <Card.Body>

          <Card.Title
          onClick={()=> {
           return history.push("/timeline",{pool})}}>
          {pool.name}
          </Card.Title>

            <Card.Text style={{color: colorChoice }}>
              {pool.description}
            </Card.Text>

        </Card.Body>
      </Card>
      </div>
    );
  }):(
    <div>
       <h2>Loading...</h2>
    </div>
  );


  return(
    <div className="container">{poolList}</div>
);

}

export default withRouter(Card1);