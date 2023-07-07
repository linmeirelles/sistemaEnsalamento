import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Form, Card, Modal } from "react-bootstrap";

const Salas = () => {
  const [listaSalas, setListaSalas] = useState([]);
  const [sala, setSala] = useState({ sala: "", curso: "", periodo: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [listaPeriodo, setListaPeriodo] = useState([]);
  const [listaCursos, setListaCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const objStr = localStorage.getItem("lSala");
    const objLista = JSON.parse(objStr);
    setListaSalas(objLista || []);

    const listaPeriodosAux = localStorage.lPeriodo ? JSON.parse(localStorage.lPeriodo) : [];
    setListaPeriodo(listaPeriodosAux || []);

    const listaCursosAux = localStorage.lCurso ? JSON.parse(localStorage.lCurso) : [];
    setListaCursos(listaCursosAux || []);
  }, []);

  const onSave = () => {
    if (modeForm === "create") {
      sala.id = listaSalas.length + 1;
      listaSalas.push(sala);
      setListaSalas([...listaSalas]);
    }

    if (modeForm === "edit") {
      const salaAux = listaSalas.find((p) => p.id === sala.id);
      salaAux.sala = sala.sala;
      salaAux.curso = sala.curso;
      salaAux.periodo = sala.periodo;
      setListaSalas([...listaSalas]);
    }
    localStorage.setItem("lSala", JSON.stringify(listaSalas));
    onNew();
    setShowModal(false);
  };

  const onEdit = (salaAux) => {
    setSala(salaAux);
    setModeForm("edit");
    setShowModal(true);
  };

  const onNew = () => {
    setModeForm("create");
    setSala({ sala: "", curso: "", periodo: "" });
  };

  const onRemove = (pRemove) => {
    const updatedList = listaSalas.filter((p) => p.id !== pRemove.id);
    setListaSalas(updatedList);
    localStorage.setItem("lSala", JSON.stringify(updatedList));
  };

  const onCancel = () => {
    onNew();
    setShowModal(false);
  };

  const handlePeriodoChange = (event) => {
    setSala({ ...sala, periodo: event.target.value });
  };

  const handleCursoChange = (event) => {
    setSala({ ...sala, curso: event.target.value });
  };

  return (
    <Container>
      <br />
      <Row>
        <h1>Salas</h1>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Cadastro de Salas</h4>
            </Card.Header>
            <Card.Body>
              <Container>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Nova Sala
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <h4>Lista de Salas:</h4>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Sala</th>
                <th>Curso</th>
                <th>Período</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaSalas.map((salaAux) => (
                <tr key={salaAux.id}>
                  <td>{salaAux.id}</td>
                  <td>{salaAux.sala}</td>
                  <td>{salaAux.curso}</td>
                  <td>{salaAux.periodo}º Período</td>
                  <td className="editButtons">
                    <Button onClick={() => onEdit(salaAux)} variant="primary">
                      Editar
                    </Button>
                    <Button onClick={() => onRemove(salaAux)} variant="danger">
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{modeForm === "create" ? "Nova Sala" : "Editar Sala"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formSala">
              <Form.Label>Sala:</Form.Label>
              <Form.Control
                required
                value={sala.sala}
                onChange={({ target }) => setSala({ ...sala, sala: target.value })}
                type="text"
                placeholder="Insira a sala aqui"
              />
            </Form.Group>

            <Form.Label>Curso:</Form.Label>
            <Form.Group className="mb-3" controlId="formCursos">
              <Form.Select
                aria-label="Selecione o curso que usará a sala"
                value={sala.curso}
                onChange={handleCursoChange}
              >
                <option value="">Selecione o curso que usará a sala</option>
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
                value={sala.periodo}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onSave}>
            Salvar
          </Button>
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Salas;
