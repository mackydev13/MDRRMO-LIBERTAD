import React from 'react';

const CardContainer = ({title,children}) => {
  return (
      <div className="flex flex-col">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {children}
          </div>
      </div>
  );
};


export default CardContainer;
