# React Datatable Light

A simple datatable library for React. Useful for displaying, sorting and searching 
through JSON Array data.

## Features
- Data displayed in a table
- Sorting
- Searching

## How To Use ?

### Prerequisite

- React 18.2 or higher
- [Vite](https://vitejs.dev/guide/) to setup your React project

### installation

**Npm** ``npm i react-datatable-light -S``

**Yarn** ``yarn add react-datatable-light``

**Pnpm** ``pnpm add react-datatable-light``

Import the Datatable react component from *Datatable.jsx* :

```jsx
import Datatable from "react-datatable-light/Datatable"

function App(){
  const data = [
    {firstName: "John", lastName: "Doe"}, 
    {firstName: "Jane", lastName: "Smith"}
  ];

  return <Datatable data={data} />;
}

export default App;
```


## Options
There are a few options that you can use with the library, to specify options use the *option* 
attribute in the Datatable component :

```jsx
import Datatable from "react-datatable-light/Datatable";

<Datatable data={data} options={
  {perPage: 25, entries: false, search: true, sort: false}
}>
```

### Options List
- options.perPage (int) / Default : ``10`` | 
Defines the number of items per page
- options.entries (boolean) / Default ``true`` | Show / Hide the entries select menu to change the 
entries showed per page
- options.search (boolean) / Default ``true`` | Show / Hide the search input
- options.sort (boolean) / Default ``true`` | enable / Disable the sort feature on columns

### Custom style

You can add a className attribute to add your own css class

```jsx
<Datatable data={data} className={"custom-class"}/>;
```
In your CSS file :
```css 
.custom-class{
    /* Your custom style */
}
```
