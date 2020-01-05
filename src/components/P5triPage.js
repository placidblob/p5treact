import React from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Button } from 'antd';

const P5triPage = () => {
  return (
    <div>
      <h1>React Slingshot</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="/fuel-savings">demo app</Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>

      <Button> booh </Button>

      <DatePicker/>
    </div>
  );
};

export default P5triPage;
