import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";

const Horarios = () => {
  const [listahorarios, setListaHorarios] = useState([]);
  const [horario, setHorario] = useState({
    horario: "",
    professor: "",
    curso: "",
    periodo: "",
    id: 0,
  });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);
  const [listaCursos, setListaCursos] = useState([]);
  const [listaProfessores, setListaProfessores] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const objStr = localStorage.getItem("lHorario");
    const objLista = JSON.parse(objStr);
    setListaHorarios(objLista || []);

    const listaProfessorAux =
      localStorage.lProfessor === undefined
        ? []
        : JSON.parse(localStorage.lProfessor);
    setListaProfessores(listaProfessorAux || []);

    const listaCursoAux =
      localStorage.lCurso === undefined ? [] : JSON.parse(localStorage.lCurso);
    setListaCursos(listaCursoAux || []);

    const listaPeriodosAux =
      localStorage.lPeriodo === undefined
        ? []
        : JSON.parse(localStorage.lPeriodo);
    setListaPeriodo(listaPeriodosAux || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      horario.id = listahorarios.length + 1;
      listahorarios.push(horario);
      setListaHorarios([...listahorarios]);
    }

    if (modeForm === "edit") {
      const horarioAux = listahorarios.find((p) => p.id === horario.id);
      horarioAux.horario = horario.horario;
      horarioAux.professor = horario.professor;
      horarioAux.curso = horario.curso;
      horarioAux.periodo = horario.periodo;
      setListaHorarios([...listahorarios]);
    }
    localStorage.setItem("lhorario", JSON.stringify(listahorarios));
    onNew();
  };

  const onEdit = (horarioAux) => {
    setHorario(horarioAux);
    setModeForm("edit");
    setShowModal(true);
  };

  const onNew = () => {
    setModeForm("create");
    setHorario({ horario: "", professor: "", curso: "", periodo: "" });
    setShowModal(false);
  };

  const onRemove = (pRemove) => {
    const updatedList = listahorarios.filter((p) => p.id !== pRemove.id);
    setListaHorarios(updatedList);
    localStorage.setItem("lhorario", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };

  const handleProfChange = (event) => {
    setHorario({ ...horario, professor: event.target.value });
  };

  const handleCursoChange = (event) => {
    setHorario({ ...horario, curso: event.target.value });
  };

  const handlePeriodoChange = (event) => {
    setHorario({ ...horario, periodo: event.target.value });
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Horários</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Horários</h4>
            </Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Novo Horário
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <h4>Lista de Horarios:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>horario</th>
                <th>Professor</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listahorarios.map((horarioAux) => (
                <tr key={horarioAux.id}>
                  <td>{horarioAux.id}</td>
                  <td>{horarioAux.horario}</td>
                  <td>{horarioAux.professor}</td>
                  <td>{horarioAux.curso}</td>
                  <td>{horarioAux.periodo}° Período</td>
                  <td class="editButtons">
                    <Button
                      onClick={() => {
                        onEdit(horarioAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(horarioAux);
                      }}
                      variant="danger"
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de horarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formhorario">
              <Form.Label>horario:</Form.Label>
              <Form.Control
                required
                value={horario.horario}
                onChange={({ target }) => {
                  setHorario({ ...horario, horario: target.value });
                }}
                type="text"
                placeholder="Insira aqui o nome do horario"
              />
            </Form.Group>

            <Form.Label>Professor:</Form.Label>
            <Form.Group className="mb-3" controlId="formSalas">
              <Form.Select
                aria-label="Selecione o professor que dará o horario"
                value={horario.professor}
                onChange={handleProfChange}
              >
                <option value="">Selecione o professor que dará o horario</option>
                {listaProfessores.map((prof) => (
                  <option key={prof.id} value={prof.name}>
                    {prof.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Label>Curso:</Form.Label>
            <Form.Group className="mb-3" controlId="formCursos">
              <Form.Select
                aria-label="Selecione o curso do horario"
                value={horario.curso}
                onChange={handleCursoChange}
              >
                <option value="">Selecione o curso do horario</option>
                {listaCursos.map((curso) => (
                  <option key={curso.id} value={curso.curso}>
                    {curso.curso}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Label>Período:</Form.Label>
            <Form.Group className="mb-3" controlId="formPeriodo">
              <Form.Select
                aria-label="Selecione o periodo que usará a sala"
                value={horario.periodo}
                onChange={handlePeriodoChange}
              >
                <option value="">Selecione o periodo que usará a sala</option>
                {listaPeriodo.map((periodo) => (
                  <option key={periodo.id} value={periodo.periodo}>
                    {periodo.periodo}º Período
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="success" onClick={onSave}>
              Salvar
            </Button>{" "}
            <Button variant="danger" onClick={onCancel}>
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Horarios;

