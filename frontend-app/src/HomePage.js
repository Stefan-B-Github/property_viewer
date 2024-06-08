import React from 'react';
import PropertyList from './components/PropertyList.js';
import PropertyAddOrEdit from './components/PropertyAddOrEdit.js';

const HomePage = () => {
    
  return (
    <div class="container">
    <h1>Property List</h1>    
    <PropertyList />
    <hr />
    <h2>Add new Property</h2>
    <PropertyAddOrEdit />
  </div>
  );
};

export default HomePage;