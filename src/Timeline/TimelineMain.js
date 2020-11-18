import React, { Component } from 'react'

import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import axios from "../services/ApiCalls";

import "./timelineStyle.css";


export default class TimelineMain extends Component {

    state = {
        stakes: [],
        loading: true,
        message: "Loading timeline..."
    }


    componentDidMount(){

        
        axios.get(`/pools/${this.props.location.state.pool.pool_hash}/delegations`)
        .then( res => {

            // variable i is for iteration over the array
            // j is basically a tracker which determines if
            // the date in the consecutive array element is different
            // from the previous one
            let i = 0;
            let j = 1;
            let address = [];
            let totalDelegation = 0;


            // Algorithm for restructuring the fetched data
            // into the format suitable for the timeline
            // looping through each of the elements in the response object
            // if the date is the same, address are added to the state named address
            // if the date is different, the object is added to the state named stakes

            for (i; i< res.data.data.length; i++){
                j = i + 1;

                if (j >= res.data.data.length){
                    j = 0
                }

                if(res.data.data[j].transaction.block.forgedAt.substring(0,10) === res.data.data[i].transaction.block.forgedAt.substring(0,10)){
                    totalDelegation += res.data.data[i].transaction.deposit

                    if (address.find(function(element){
                        return element === res.data.data[i].address
                    }) === undefined){
                        address.push(res.data.data[i].address)
                    }
                   
                }

                if((res.data.data[j].transaction.block.forgedAt.substring(0,10) !== res.data.data[i].transaction.block.forgedAt.substring(0,10)) || (i === res.data.data.length-1))
                {
                    totalDelegation += res.data.data[i].transaction.deposit

                    if (address.find(function(element){
                        return element === res.data.data[i].address
                    }) === undefined){
                        address.push(res.data.data[i].address)
                    }

                    this.setState({
                        stakes: [
                            ...this.state.stakes,
                            {
                                address: address,
                                totalDelegation: totalDelegation,
                                hash: res.data.data[i].transaction.hash,
                                date: res.data.data[i].transaction.block.forgedAt.substring(0,10)
                            }
                        ],
                    }, ()=>{
                        totalDelegation = 0;
                        address = [];
                    })
                }   
            }
            
        })
        .finally(a =>{
            this.setState({
                loading: false
            })
        })
    }
    
   

    

    render() {
        let TimelineList = this.state.loading ? <div style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <h2 style={{textAlign:"center"}}>{this.state.message}</h2>
        </div>:
        <div>            
                    <Timeline lineColor={"#ddd"}>
                    {this.state.stakes.map(stake => {

                       return <TimelineItem
                        key={stake.hash}
                        dateText={stake.date}
                        bodyContainerStyle={{
                            background: "#ddd",
                            padding: "16px",
                            borderRadius: "8px",
                            boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0,0,0,0.2)"
                        }}
                        style={{ color: '#e86971' }}>
                        <h6 style={{display:"flex",justifyContent:"center",fontWeight:"bold"}}> Total delegation: {stake.totalDelegation/1000}k ada</h6>
                        <hr
                        style={{
                            color: "gray",
                            height:2,
                            width:"96%"
                        }}/>
                        {stake.address.map((a,index)=> {
                           return <h6
                           key={index}
                           className="fonts">{a.substring(5,)}</h6>
                        })}
                        </TimelineItem>
                    })}                   
                    </Timeline>
                <div>
                    
                </div>
        </div>
        return (
            <div style={{flex:1}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1>{this.props.location.state.pool.name}</h1>
                </div>
                {TimelineList}
            </div>
        )
    }
}
