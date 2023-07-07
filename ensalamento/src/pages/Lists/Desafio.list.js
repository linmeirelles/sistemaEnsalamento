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

const Desafios = () => {
  const [listaDesafios, setListaDesafios] = useState([]);
  const [desafio, setDesafio] = useState({
    desafio: "",
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
    const objStr = localStorage.getItem("lDesafio");
    const objLista = JSON.parse(objStr);
    setListaDesafios(objLista || []);

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
      desafio.id = listaDesafios.length + 1;
      listaDesafios.push(desafio);
      setListaDesafios([...listaDesafios]);
    }

    if (modeForm === "edit") {
      const desafioAux = listaDesafios.find((p) => p.id === desafio.id);
      desafioAux.desafio = desafio.desafio;
      desafioAux.professor = desafio.professor;
      desafioAux.curso = desafio.curso;
      desafioAux.periodo = desafio.periodo;
      setListaDesafios([...listaDesafios]);
    }
    localStorage.setItem("lDesafio", JSON.stringify(listaDesafios));
    onNew();
  };

  const onEdit = (desafioAux) => {
    setDesafio(desafioAux);
    setModeForm("edit");
    setShowModal(true);
  };

  const onNew = () => {
    setModeForm("create");
    setDesafio({ desafio: "", professor: "", curso: "", periodo: "" });
    setShowModal(false);
  };

  const onRemove = (pRemove) => {
    const updatedList = listaDesafios.filter((p) => p.id !== pRemove.id);
    setListaDesafios(updatedList);
    localStorage.setItem("lDesafio", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
  };

  const handleProfChange = (event) => {
    setDesafio({ ...desafio, professor: event.target.value });
  };

  const handleCursoChange = (event) => {
    setDesafio({ ...desafio, curso: event.target.value });
  };

  const handlePeriodoChange = (event) => {
    setDesafio({ ...desafio, periodo: event.target.value });
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Desafios</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Desafios</h4>
            </Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Novo Desafio
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <h4>Lista de Desafios:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Desafio</th>
                <th>Professor</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaDesafios.map((desafioAux) => (
                <tr key={desafioAux.id}>
                  <td>{desafioAux.id}</td>
                  <td>{desafioAux.desafio}</td>
                  <td>{desafioAux.professor}</td>
                  <td>{desafioAux.curso}</td>
                  <td>{desafioAux.periodo}° Período</td>
                  <td class="editButtons">
                    <Button
                      onClick={() => {
                        onEdit(desafioAux);
                      }}
                      variant="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        onRemove(desafioAux);
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
          <Modal.Title>Cadastro de Desafios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDesafio">
              <Form.Label>Desafio:</Form.Label>
              <Form.Control
                required
                value={desafio.desafio}
                onChange={({ target }) => {
                  setDesafio({ ...desafio, desafio: target.value });
                }}
                type="text"
                placeholder="Insira aqui o nome do desafio"
              />
            </Form.Group>

            <Form.Label>Professor:</Form.Label>
            <Form.Group className="mb-3" controlId="formSalas">
              <Form.Select
                aria-label="Selecione o professor que dará o desafio"
                value={desafio.professor}
                onChange={handleProfChange}
              >
                <option value="">Selecione o professor que dará o desafio</option>
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
                aria-label="Selecione o curso do desafio"
                value={desafio.curso}
                onChange={handleCursoChange}
              >
                <option value="">Selecione o curso do desafio</option>
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
                aria-label="Selecione o período que usará a sala"
                value={desafio.periodo}
                onChange={handlePeriodoChange}
              >
                <option value="">Selecione o período que usará a sala</option>
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

export default Desafios;
