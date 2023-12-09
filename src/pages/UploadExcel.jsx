import { useState } from "react"
import { show_alerta } from "../helpers/functions";

export const UploadExcel = () => {

  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState({ started: null, pc: 0 })
  const [msg, setMsg] = useState(null)

  const handleUpload = () => {
    if (!file) {
      setMsg('Archivo no seleccionado')
      return
    }

    const fd = new FormData()
    fd.append('file', file)

    setMsg('Cargando...')

    // falta colocar el url del back en fetch
    fetch('', {
      method: 'POST',
      body: fd,
      headers: {
        'Custom-Header': 'value',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Mala respuesta')
        }
        setMsg('Carga exitosa')
        return res.json()
      })
      .then(data => console.log(data))
      .catch(err => {
        setMsg('Carga fallida')
        console.log(err)
      })
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="">Carga de Excel</h1>
        <hr />

        <section className="w-100 lg-w upload-container d-flex flex-column align-items-center justify-content-center">

          <input onChange={ (e) => { setFile(e.target.files[0]) } } type="file" className="fs-7 mb-4" />

          <button onClick={ handleUpload } type="button" className="btn btn-danger mw-100 btn-upload-excel mb-3">Cargar Excel</button>

          { progress.started && <progress max='100' value={ progress.pc }></progress> }
          { msg && <span className="fs-7">{ msg }</span> }

        </section>
      </div>

    </>
  )
}
