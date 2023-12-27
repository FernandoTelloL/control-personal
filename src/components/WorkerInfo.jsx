

import { useContext } from 'react';
import userPhoto from '../assets/user-photo.png';
import { capitalizeFirstLetter } from '../helpers/functions';
import { WorkerContext } from '../context/WorkerContext';

export const WorkerInfo = () => {
  // uso la informacion de WorkerContext
  const { worker } = useContext(WorkerContext)
  console.log(worker)
  let birthdate = 0
  let formattedDate = 0
  if (worker !== null) {
    birthdate = new Date(worker.employee.birthdate)


    // inicio formateo de fecha de nacimiento
    const day = birthdate.getDate(); // Día del mes
    const month = birthdate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1 para obtener el mes correcto
    const year = birthdate.getFullYear(); // Año

    formattedDate = `${day}/${month}/${year}`;
    // fin formateo de fecha de nacimiento

    return (
      <div
        className="row mb-5 mt-5 pt-5 pb-5"
        style={ { fontSize: '13px' } }
      >
        <div
          className="col-12 col-md-4 mb-5 text-center"
          style={ { with: '200px' } }>
          { <img
            src={ worker.employee.photo ? worker.employee.photo : userPhoto }
            alt="Foto del trabajador" className="img-thumbnail"
            style={ { width: '200px', height: '200px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' } }
          /> }
        </div>

        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>DNI:</p>
            <p>{ worker.employee.dni }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Cod de planilla:</p>
            <p>{ worker.employee.code }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Nombres:</p>
            <p> { worker.employee.names }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Apellidos:</p>
            <p>{ capitalizeFirstLetter(worker.employee.firstLastName) + " " + capitalizeFirstLetter(worker.employee.secondLastName) }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>F de nacimiento:</p>
            <p> { formattedDate }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Teléfono: </p>
            <p>{ worker.employee.phone }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Email: </p>
            <p className='w-50 overflow-wrap-anywhere'>{ worker.employee.email.toLowerCase() }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Dirección:</p>
            <p className='w-50 overflow-wrap-anywhere'> { capitalizeFirstLetter(worker.employee.address) }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Tipo de sangre:</p>
            <p> { worker.employee.bloodType }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Supervisor:</p>
            <p> { worker.employee.supervisor }</p>
          </div>

        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Blusa o camisa manga corta:</p>
            <p> { worker.employee.shortSleeveBlouseOrShirt }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Polo cuello box (camisero): </p>
            <p>{ worker.employee.boxNeckPolo }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Pantalón:</p>
            <p> { worker.employee.pants }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Gorro:</p>
            <p> { worker.employee.cap }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Blusa o camisa manga larga:</p>
            <p> { worker.employee.longSleeveBlouseOrShirt }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Casaca reflectiva:</p>
            <p> { worker.employee.reflectiveJacket }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Chompa cuello alto (Jorge Chavez):</p>
            <p> { worker.employee.highNeckSweatshirt }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Chaleco:</p>
            <p> { worker.employee.vest }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Poncho impermeable reflectivo:</p>
            <p> { worker.employee.reflectiveWaterproofPoncho }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Borceguíes:</p>
            <p> { worker.employee.borceguies }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Calcetines:</p>
            <p> { worker.employee.socks }</p>
          </div>

          <div className="worker-information d-flex justify-content-start">
            <p className='w-50'>Calzado: </p>
            <p>{ worker.employee.footwear }</p>
          </div>

        </div>
      </div >
    )
  } else {
    return (<></>)
  }


}

