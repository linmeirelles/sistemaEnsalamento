import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form, Card, Modal } from "react-bootstrap";

const Cursos = () => {
  const [listaCursos, setListaCursos] = useState([]);
  const [curso, setCurso] = useState({ curso: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const objStr = localStorage.getItem("lCurso");
    const objLista = JSON.parse(objStr);
    setListaCursos(objLista || []);

    const listaPeriodosAux = localStorage.lPeriodo ? JSON.parse(localStorage.lPeriodo) : [];
    setListaPeriodo(listaPeriodosAux || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      curso.id = listaCursos.length + 1;
      listaCursos.push(curso);
      setListaCursos([...listaCursos]);
    }

    if (modeForm === "edit") {
      const cursoAux = listaCursos.find((p) => p.id === curso.id);
      cursoAux.curso = curso.curso;
      cursoAux.periodo = curso.periodo;
      setListaCursos([...listaCursos]);
    }
    localStorage.setItem("lCurso", JSON.stringify(listaCursos));
    onNew();
    setShowModal(false);
  };

  const onEdit = (cursoAux) => {
    setCurso(cursoAux);
    setModeForm("edit");
    setShowModal(true);
  };

  const onNew = () => {
    setModeForm("create");
    setCurso({ curso: "", periodo: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaCursos.filter((p) => p.id !== pRemove.id);
    setListaCursos(updatedList);
    localStorage.setItem("lCurso", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
    setShowModal(false);
  };

  const handlePeriodoChange = (event) => {
    setCurso({ ...curso, periodo: event.target.value });
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Cursos</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Cursos</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Novo Curso
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <h4>Lista de Cursos:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaCursos.map((cursoAux) => (
                <tr key={cursoAux.id}>
                  <td>{cursoAux.id}</td>
                  <td>{cursoAux.curso}</td>
                  <td>{cursoAux.periodo}º Período</td>
                  <td className="editButtons">
                    <Button onClick={() => onEdit(cursoAux)} variant="primary">
                      Editar
                    </Button>
                    <Button onClick={() => onRemove(cursoAux)} variant="danger">
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
          <Modal.Title>Cadastro de Cursos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCurso">
              <Form.Label>Curso:</Form.Label>
              <Form.Control
                required
                value={curso.curso}
                onChange={({ target }) => {
                  setCurso({ ...curso, curso: target.value });
                }}
                type="text"
                placeholder="Insira aqui o curso"
              />
            </Form.Group>

            <Form.Label>Período:</Form.Label>
            <Form.Group className="mb-3" controlId="formPeriodo">
              <Form.Select
                aria-label="Selecione o período do curso"
                value={curso.periodo}
                onChange={handlePeriodoChange}
              >
                <option value="">Selecione o período do curso</option>
                {listaPeriodo.map((periodo) => (
                  <option key={periodo.id} value={periodo.periodo}>
                    {periodo.periodo}º Período
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onSave}>
            Salvar
          </Button>{" "}
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cursos;
