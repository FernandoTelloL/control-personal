// MonthComponent.js
import React, { useState } from 'react';

const MonthComponent = ({ attendanceData, controlTypes }) => {
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [selectedTab, setSelectedTab] = useState(controlTypes[0].type);

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

  const handleTabSelect = (type) => {
    setSelectedTab(type);
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
      <ul className="nav nav-tabs mb-3 tabs-types-control">
        { controlTypes.map((type) => (
          <li key={ type.id } className="nav-item tab-item-types-control">
            <button
              className={ `tab-link-types-control nav-link ${type.type === selectedTab ? 'active' : ''}` }
              onClick={ () => handleTabSelect(type.type) }
            >
              { type.description }
            </button>
          </li>
        )) }
      </ul>
      <div className="row">
        { Array.from({ length: 31 }, (_, dayIndex) => (
          <div key={ dayIndex } className="col p-2">
            <span>{ dayIndex + 1 }</span>
            <div className="attendance-info mt-2">
              { Object.keys(filteredData).map((workerId) => {
                const worker = filteredData[workerId];
                const isPresent = worker.asistio.includes(dayIndex + 1);
                const isLate = worker.falto.includes(dayIndex + 1);
                const rest = worker.descanso.includes(dayIndex + 1);


                const controlType = controlTypes.find((type) => {
                  return (
                    (isPresent && type.type === 'X') ||
                    (isLate && type.type === 'F') ||
                    (rest && type.type === 'DESC') ||
                    false
                  );
                });

                const colorClass =
                  controlType && controlType.type === selectedTab
                    ? `bg-${controlType.type}`
                    : '';

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
