import React, { Component } from 'react';
import Card1 from './cardsUI.js';
import Searchbar from "../search/Searchbar.js";



import axios from "../services/ApiCalls.js";

// searchlist is to store the search result
// Search Variable is to store the search input
let SearchList = [];
let Search = "";

let isMounted = true;




export default class CardMain extends Component {

    state = {
        Pools : [],
        loading: false
    }

    componentDidMount(){
        axios.get('/pools')
        .then (res => {
                //console.log(res.data.data);
                this.setState({
                    Pools: res.data.data,
                    loading: true,
                    message: "Loading..."
                },()=>{
                    if (res && isMounted){
                        this.setState({
                            loading: false
                        });
                    }
                })
            }
        )
        .catch(err=>{
            console.log(err)
        })
    }

    


    // the function is for search method
    // upon search, this function is called and the state of the pools is changed
    searchTrigger = (search) => {

        Search = search.toLowerCase();

        SearchList = this.state.Pools.filter((e)=> {
            if (e.name.toLowerCase().includes(Search)){
                this.setState({
                    loading: false
                })
                return e
            } 
        })

        if (SearchList.length === 0){
            this.setState({
                loading: true,
                message: "No pools found"
            })
        }
    }


    render() {
        return (
            <div>
                <Searchbar trigger={this.searchTrigger}/>
                { this.state.loading ?
                 <div className="d-flex justify-content-center">{this.state.message}</div>   
                :<div>
                   {Search === "" ? <Card1 pools={this.state.Pools}/> : <Card1 pools={SearchList}/> }
                </div>
                }
            </div>
        )
    }
}
