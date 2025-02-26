import React, { useState } from 'react';

export default function EditarPerfil() {
  const [formData, setFormData] = useState({
    documento: '12345678', // Ejemplo, puedes obtener esto de la sesión
    tipoDocumentoCompleto: 'Lina Marcela',
    correo: 'lina@example.com',
    celular: '1234567890',
    rol: 'Admin',
    contraseña: '',
    confirmarContraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Perfil actualizado:', formData);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="documento" className="form-label">Documento</label>
            <input
              type="text"
              className="form-control"
              id="documento"
              name="documento"
              value={formData.documento}
              readOnly
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="tipoDocumentoCompleto" className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="tipoDocumentoCompleto"
              name="tipoDocumentoCompleto"
              value={formData.tipoDocumentoCompleto}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="celular" className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="rol" className="form-label">Rol</label>
            <input
              type="text"
              className="form-control"
              id="rol"
              name="rol"
              value={formData.rol}
              readOnly
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="confirmarContraseña" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}
