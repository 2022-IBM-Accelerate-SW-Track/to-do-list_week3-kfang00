import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const task = screen.getByRole('textbox', {name: /Add New Item/i});
  const date = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i} )
  const dueDate = "06/26/2022";
  fireEvent.change(task, {target: {value: "Please swiffer the floor!"}});
  fireEvent.change(date, {target: {value: dueDate}});
  fireEvent.click(addButton);
  let checkTask = screen.getByText(/Please swiffer the floor!/i);
  let checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkTask).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  fireEvent.change(task, {target: {value: "Please swiffer the floor!"}});
  fireEvent.change(date, {target: {value: dueDate}});
  fireEvent.click(addButton);
  checkTask = screen.getByText(/Please swiffer the floor!/i);
  checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkTask).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const task = screen.getByRole('textbox', {name: /Add New Item/i});
  const date = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i} )
  const dueDate = "06/26/2022";
  fireEvent.change(task, {target: {value: ""}});
  fireEvent.change(date, {target: {value: dueDate}});
  fireEvent.click(addButton);
  expect(() => screen.getByText(new RegExp(dueDate, "i"))).toThrowError();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const task = screen.getByRole('textbox', {name: /Add New Item/i});
  const date = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i} )
  fireEvent.change(task, {target: {value: "Please swiffer the floor!"}});
  fireEvent.change(date, {target: {value: ""}});
  fireEvent.click(addButton);
  expect(() => screen.getByText(/Please swiffer the floor!/i)).toThrowError();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const task = screen.getByRole('textbox', {name: /Add New Item/i});
  const date = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i} )
  const dueDate = "06/26/2022";
  fireEvent.change(task, {target: {value: "Please swiffer the floor!"}});
  fireEvent.change(date, {target: {value: dueDate}});
  fireEvent.click(addButton);
  const checkbox = screen.getByRole('checkbox');
  let checkTask = screen.getByText(/Please swiffer the floor!/i);
  let checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkTask).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(() => screen.getByText(/Please swiffer the floor!/i)).toThrowError();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const task = screen.getByRole('textbox', {name: /Add New Item/i});
  const date = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i} )
  const pastDueDate = "06/26/2022";
  const dueDate = "06/26/2023";
  fireEvent.change(task, {target: {value: "Please swiffer the floor!"}});
  fireEvent.change(date, {target: {value: pastDueDate}});
  fireEvent.click(addButton);
  fireEvent.change(task, {target: {value: "Finish my homework"}});
  fireEvent.change(date, {target: {value: dueDate}});
  fireEvent.click(addButton);
  const pastColor = screen.getByTestId(/Please swiffer the floor!/i).style.background;
  const futureColor = screen.getByTestId(/Finish my homework/i).style.background;
  expect(pastColor).toBe('red');
  expect(futureColor).toBe('white');
 });
