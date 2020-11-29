import axios from "./ApiCalls";

let pools = [];
let allPools = [];
let poolsUnite = [];
let StakesinaPool;
let poolName;
let totalElements = 0;

export async function poolList(page) {
    pools = await axios.get(`/pools?page=${page}&size=100`)
    .then (res => {
            return res.data.data
        }
    )
    for(let i =0 ; i< pools.length; i++){
    poolsUnite.push(pools[i])
    }
}

export async function totalElementsinPool(hash){
    totalElements = await axios.get(`/pools/${hash}/delegations`)
    .then(response => {
        return response.data.page.totalElementCount
    })
}

export async function poolHashes(address) {
    StakesinaPool = await axios.get(`/stakes/${address}/delegations`)
    .then(response => {
        return response.data.data[0].stakePool.hash
    })
    return StakesinaPool
}

export async function currentPool(address){
    let currentPool = await axios.get(`/stakes/${address}/delegations`)
    .then(response => {
        return response.data.data
    })
    return currentPool
}

export async function registrations(address){
    let registrated = await axios.get(`/stakes/${address}/registration`)
    .then(response => {
        return response.data.data.transaction.block.forgedAt.substring(0,10) + ", " + response.data.data.transaction.block.forgedAt.substring(11,16);
    })
    return registrated
}


export async function poolFind(hash) {
    poolName = await axios.get(`/pools?q=${hash}`)
    .then (res => {
            if(res.data.data.length === 0){
            return "Unavailable"
            }else{
            return res.data.data[0].name
            }
        }
    )
    return poolName
}

export {pools, allPools, poolsUnite}



