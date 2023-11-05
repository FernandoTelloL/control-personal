
export const RegisterUser = () => {
  return (

    <>


      <div class="container mt-5">

        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item active">Registrar usuario</li>
        </ol>
        
        <h2 class="text-center mb-4">Formulario de Registro de Usuario</h2>
        <form>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="primer-nombre" class="form-label">Primer Nombre</label>
              <input type="text" class="form-control" id="primer-nombre" placeholder="Primer nombre" />
            </div>
            <div class="col-md-6">
              <label for="segundo-nombre" class="form-label">Segundo Nombre</label>
              <input type="text" class="form-control" id="segundo-nombre" placeholder="Segundo nombre" />
            </div>
            <div class="col-md-6">
              <label for="primer-apellido" class="form-label">Primer Apellido</label>
              <input type="text" class="form-control" id="primer-apellido" placeholder="Primer apellido" />
            </div>
            <div class="col-md-6">
              <label for="segundo-apellido" class="form-label">Segundo Apellido</label>
              <input type="text" class="form-control" id="segundo-apellido" placeholder="Segundo apellido" />
            </div>
            <div class="col-md-6">
              <label for="dni" class="form-label">Número de DNI</label>
              <input type="text" class="form-control" id="dni" placeholder="Número de DNI" />
            </div>
            <div class="col-md-6">
              <label for="rol" class="form-label">Rol</label>
              <select class="form-select" id="rol">
                <option value="usuario">Usuario</option>
                <option value="administrador">Administrador</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">Registrar</button>
          </div>
        </form>
      </div>


    </>
  )
}
