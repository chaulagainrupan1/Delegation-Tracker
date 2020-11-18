import { render, screen } from '@testing-library/react';
import CardMain from './CardMain.js';
import {unmountComponentAtNode} from "react-dom";
import { act } from 'react-dom/test-utils';
import {BrowserRouter, MemoryRouter, Route, Switch } from "react-router-dom";
import { shallow, Enzyme } from "enzyme";
import renderer from 'react-test-renderer';


// const clickFn = jest.fn();
// describe('MyComponent', () => {
//   it('button click should hide component', () => {
//     const component = shallow(<MyComponent onClick={clickFn} />);
//     component
//       .find('button#my-button-two')
//       .simulate('click');
//     expect(clickFn).toHaveBeenCalled();
//   });
// });