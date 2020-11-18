import { render, screen } from '@testing-library/react';
import CardMain from './CardMain.js';
import * as axios from "axios";
import { shallow } from 'enzyme';

jest.mock('axios');

test("bad response", ()=>{
    axios.get.mockImplementation(()=>{
        Promise.reject({status: "bad response"})
    });
});

test("good response", ()=>{
    axios.get.mockImplementation(()=>{
        Promise.resolve({status:200, data:{status:"good response"}});
    })
});
