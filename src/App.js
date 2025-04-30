import React from "react";
import { Button, Row, Container, Col, Form, Navbar, Table, Image } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [newImage, setNewImage] = React.useState("");
  const [updateTask, setUpdateTask] = React.useState("");
  const [updateImage, setUpdateImage] = React.useState("");

  React.useEffect(() => {
    const readTasks = () => {
      if (localStorage.getItem("tasks")) {
        setTasks(JSON.parse(localStorage.getItem("tasks")));
      }
    };
    readTasks();
  }, []);

  const onCreate = () => {
    const newEntry = { name: newTask, image: newImage };
    const updatedTasks = [...tasks, newEntry];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setNewTask("");
    setNewImage("");
  };

  const onDelete = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const onUpdate = (task) => {
    const index = tasks.indexOf(task);
    const updatedTasks = [...tasks];
    if (updateTask) updatedTasks[index].name = updateTask;
    if (updateImage) updatedTasks[index].image = updateImage;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setUpdateTask("");
    setUpdateImage("");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Galeria de Arte</Navbar.Brand>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
            <h2>Adicionar nova Obra de Arte</h2>
            <Form>
              <Form.Group>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Nome da Obra"
                />
                <Form.Control
                  className="mt-2"
                  autoComplete="off"
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="URL da imagem da obra"
                />
              </Form.Group>
              <Button variant="primary" onClick={onCreate}>
                Adicionar Obra
              </Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome da Obra</th>
                  <th>Excluir</th>
                  <th>Atualizar</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>
                      {task.image && (
                        <Image
                          src={task.image}
                          alt="obra"
                          rounded
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      )}
                    </td>
                    <td>{task.name}</td>
                    <td>
                      <Button variant="danger" onClick={() => onDelete(task)}>
                        Excluir
                      </Button>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        className="mb-2"
                        onChange={(e) => setUpdateTask(e.target.value)}
                        placeholder="Novo nome"
                      />
                      <Form.Control
                        type="text"
                        className="mb-2"
                        onChange={(e) => setUpdateImage(e.target.value)}
                        placeholder="Nova URL da imagem"
                      />
                      <Button
                        className="text-white"
                        variant="warning"
                        onClick={() => onUpdate(task)}
                      >
                        Atualizar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
