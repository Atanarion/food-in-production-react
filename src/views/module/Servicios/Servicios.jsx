import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Datos iniciales para la tabla
const data = [
  { id: 1, Nombre: "Decoraciones", Estado: "Activo" }
];

// Componente principal de Servicios
class Servicios extends React.Component {
  state = {
    data: data,
    filteredData: data,
    form: {
      id: '',
      Nombre: '',
      Estado: 'Activo',
    },
    modalInsertar: false,
    modalEditar: false,
    searchText: '',
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
    currentPage: 1,
    itemsPerPage: 7
  };

  // Manejar cambios en los campos del formulario
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  // Manejar la búsqueda en la tabla
  handleSearch = e => {
    const searchText = e.target.value.toLowerCase();
    this.setState({
      searchText,
      filteredData: this.state.data.filter(item =>
        item.Nombre.toLowerCase().includes(searchText)
      )
    });
  }

  // Mostrar y ocultar el modal para insertar un nuevo servicio
  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  // Mostrar y ocultar el modal para editar un servicio existente
  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  }

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  // Validar el formulario antes de insertar o editar
  validarFormulario = () => {
    const { Nombre } = this.state.form;
    if (!Nombre.trim()) {
      this.setState({ 
        snackbarMessage: 'Todos los campos son obligatorios.', 
        snackbarSeverity: 'error',
        snackbarOpen: true 
      });
      return false;
    }
    return true;
  }

  // Insertar un nuevo servicio
  insertar = () => {
    if (!this.validarFormulario()) return;

    const { data, form } = this.state;
    const tipoDocumentoExistente = data.find(servicio => servicio.Nombre.toLowerCase() === form.Nombre.toLowerCase());

    if (tipoDocumentoExistente) {
      this.setState({ 
        snackbarMessage: 'El servicio ya existe.', 
        snackbarSeverity: 'error',
        snackbarOpen: true 
      });
    } else {
      const valorNuevo = { ...form, id: data.length + 1 };
      const lista = [...data, valorNuevo];
      this.setState({ 
        data: lista, 
        filteredData: lista, 
        modalInsertar: false, 
        snackbarMessage: 'Servicio agregado con éxito.', 
        snackbarSeverity: 'success',
        snackbarOpen: true 
      });
    }
  }

  // Editar un servicio existente
  editar = (dato) => {
    if (!this.validarFormulario()) return;

    const { data } = this.state;
    const tipoDocumentoExistente = data.find(servicio => servicio.Nombre.toLowerCase() === dato.Nombre.toLowerCase() && servicio.id !== dato.id);

    if (tipoDocumentoExistente) {
      this.setState({ 
        snackbarMessage: 'No se puede editar. Otro servicio con el mismo tipoDocumento ya existe.', 
        snackbarSeverity: 'error',
        snackbarOpen: true 
      });
    } else {
      const lista = data.map(servicio => servicio.id === dato.id ? dato : servicio);
      this.setState({ 
        data: lista, 
        filteredData: lista, 
        modalEditar: false, 
        snackbarMessage: 'Servicio editado con éxito.', 
        snackbarSeverity: 'success',
        snackbarOpen: true 
      });
    }
  }

  // Eliminar un servicio
  eliminar = (dato) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: '¿Realmente desea eliminar el servicio?',
      snackbarSeverity: 'warning',
      snackbarAction: (
        <Button
          color="inherit"
          onClick={() => {
            this.setState({ snackbarOpen: false });
            const lista = this.state.data.filter(servicio => servicio.id !== dato.id);
            this.setState({ 
              data: lista, 
              filteredData: lista,
              snackbarMessage: 'Servicio eliminado con éxito.', 
              snackbarSeverity: 'success',
              snackbarOpen: true 
            });
          }}
        >
          Confirmar
        </Button>
      )
    });
  }

  // Cambiar el estado de un servicio (Activo/Inactivo)
  cambiarEstado = (id) => {
    const lista = this.state.data.map((registro) => {
      if (registro.id === id) {
        registro.Estado = registro.Estado === "Activo" ? "Inactivo" : "Activo";
      }
      return registro;
    });

    this.setState({ 
      data: lista, 
      filteredData: lista,
      snackbarMessage: 'Estado del servicio actualizado exitosamente.', 
      snackbarSeverity: 'info',
      snackbarOpen: true 
    });
  }

  // Manejar el cambio de página en la tabla
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }

  // Cerrar el Snackbar (mensaje de alerta)
  closeSnackbar = () => {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { currentPage, itemsPerPage, filteredData } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <Container>
          <br />
          <h2>Lista de Servicios Adicionales</h2>
          <br />
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Input para búsqueda */}
            <Input
              type="text"
              placeholder="Buscar servicio adicional"
              value={this.state.searchText}
              onChange={this.handleSearch}
              style={{ width: '300px' }}
            />
            {/* Botón para agregar un nuevo servicio */}
            <Button color="success" onClick={this.mostrarModalInsertar}>Agregar servicio adicional</Button>
          </div>

          {/* Tabla de servicios */}
          <Table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((elemento) => (
                <tr key={elemento.id} style={{ backgroundColor: elemento.Estado === "Inactivo" ? "#e9ecef" : "white" }}>
                  <td>{elemento.id}</td>
                  <td>{elemento.Nombre}</td>
                  <td>
                    {/* Botón para cambiar el estado de un servicio */}
                    <Button 
                      color={elemento.Estado === "Activo" ? "success" : "secondary"} 
                      onClick={(e) => { e.stopPropagation(); this.cambiarEstado(elemento.id); }}
                      size="sm"
                      className="mr-1"
                      style={{ padding: '0.375rem 0.75rem' }}
                    >
                      {elemento.Estado === "Activo" ? "Activo" : "Inactivo"}
                    </Button>{' '}
                    {/* Botón para editar un servicio */}
                    <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}><FaEdit /></Button>{' '}
                    {/* Botón para eliminar un servicio */}
                    <Button color="danger" onClick={() => this.eliminar(elemento)}><FaTrashAlt /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {/* Paginador */}
          <div className="d-flex justify-content-center">
            {pageNumbers.map(number => (
              <Button
                key={number}
                color="info"
                onClick={() => this.handlePageChange(number)}
                className="mx-1"
              >
                {number}
              </Button>
            ))}
          </div>
        </Container>

        {/* Modal para insertar un nuevo servicio */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agregar servicio adicional</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input 
                className="form-control" 
                name="Nombre" 
                type="text" 
                onChange={this.handleChange} 
                value={this.state.form.Nombre}
                style={{ border: '2px solid #000000' }}
              />
            </FormGroup>

            <ModalFooter>
              <Button style={{background:'#2e8329'}} onClick={this.insertar}>Agregar</Button>
              <Button style={{background:'#8d0f0f'}} onClick={this.ocultarModalInsertar}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        {/* Modal para editar un servicio existente */}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar servicio adicional</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input 
                className="form-control" 
                name="Nombre" 
                type="text" 
                onChange={this.handleChange} 
                value={this.state.form.Nombre}
              />
            </FormGroup>

            <ModalFooter>
              <Button style={{background:'#2e8322'}} onClick={() => this.editar(this.state.form)}>Editar</Button>
              <Button style={{background:'#6d0f0f'}} onClick={this.ocultarModalEditar}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        {/* Snackbar para mostrar mensajes de alerta */}
        <Snackbar 
          open={this.state.snackbarOpen} 
          autoHideDuration={6000} 
          onClose={this.closeSnackbar}
        >
          <Alert 
            onClose={this.closeSnackbar} 
            severity={this.state.snackbarSeverity}
          >
            {this.state.snackbarMessage}
            {this.state.snackbarAction}
          </Alert>
        </Snackbar>
      </>
    )
  }
}

export default Servicios;
