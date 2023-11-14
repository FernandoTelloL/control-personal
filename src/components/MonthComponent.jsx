// MonthComponent.js
import React, { useState } from 'react';

const MonthComponent = ({ attendanceData, controlTypes }) => {
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState({});

  const handleSearchChange = (e) => {
    const inputId = e.target.value.trim();
    setSearchId(inputId);

    if (inputId === '') {
      setFilteredData({});
    } else {
      const workerData = attendanceData[inputId];
      setFilteredData(workerData ? { [inputId]: workerData } : {});
    }
  };

  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por documento de identidad"
        value={ searchId }
        onChange={ handleSearchChange }
      />
      <div className="row">
        { Array.from({ length: 31 }, (_, dayIndex) => (
          <div key={ dayIndex } className="col p-2">
            <span>{ dayIndex + 1 }</span>
            <div className="attendance-info mt-2">
              { Object.keys(filteredData).map((workerId) => {
                const worker = filteredData[workerId];
                const isPresent = worker.asistio.includes(dayIndex + 1);
                const isLate = worker.llegoTarde.includes(dayIndex + 1);

                // Obtener el tipo de control para el día actual
                const controlType = controlTypes.find((type) => {
                  return (
                    (isPresent && type.type === "X") ||
                    (isLate && type.type === "F") ||
                    false
                  );
                });

                // Determinar el color según el tipo de control
                const colorClass = controlType ? `bg-${controlType.type}` : '';

                return (
                  <div
                    key={ workerId }
                    className={ `attendance-day ${colorClass}` }
                    title={ controlType ? controlType.description : '' }
                  />
                );
              }) }
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default MonthComponent;
