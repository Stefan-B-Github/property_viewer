import React from 'react';
import PropertyAddOrEdit from './components/PropertyAddOrEdit';


const EditPage = () => {
  return (
    <div class="container">
      <h2>Edit current property</h2>
      <PropertyAddOrEdit example="foo"/>
    </div>
  );
};

export default EditPage;