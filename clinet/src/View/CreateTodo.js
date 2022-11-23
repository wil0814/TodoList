import { Button, Form, Modal, Icon} from "semantic-ui-react";
import React, { useState } from "react";

function CreateTodo(props) {
    console.log(props);
    const [open, setopen] = useState(false);
    const [newtodo, setNewtodo] = useState("");
    const handleTodo = (e)=>{
        setNewtodo(e.target.value);
    };

    return (
        <Modal
          onClose={() => setopen(false)}
          onOpen={() => setopen(true)}
          open={open}
          trigger={<Button><Icon name='edit' />新增ToDo</Button>}
        >
          <Modal.Header>新增TODO</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Form>
                <Form.Field>
                <label>TODO名稱</label>
                <input placeholder="請在此輸入TODO名稱" onChange={handleTodo}/>
                </Form.Field>
            </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" 
            onClick={() => setopen(false)}>
              取消新增
            </Button>
            <Button
            content="確定新增"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                    props.createTodo(props.userName, newtodo)

                    setopen(false)
                }}
              positive
            />
          </Modal.Actions>
        </Modal>
    );
  }

export default CreateTodo;
