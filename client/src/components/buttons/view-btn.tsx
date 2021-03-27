import React from 'react';
// import './styles.css';
import ProductViewBtn from './transition-btn';

let ViewBtn = (props: ProdItemProps) => {
  return (
    <ProductViewBtn
      to={
        {
          pathname: `${props.path}${props.id}`,
          state: {
            name: props.name,
            value: props.value,
            id: props.id,
          }
        }
      }
      buttonName={props.btnName} />
  );
};

export default ViewBtn;