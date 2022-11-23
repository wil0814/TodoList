import { Button, Form, Modal } from "semantic-ui-react";
import React, { useState } from "react";

function ChangeList(props) {
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
          trigger={<Button basic color='yellow' className={props.Lists.Status == "success" ? "disabled":""}>修改內容</Button>}
        >
          <Modal.Header>修改TODO</Modal.Header>
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
              取消修改
            </Button>
            <Button
            content="確定修改"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                    props.changeTodo(props.Lists.ID, props.Lists.UserName, newtodo)
                    setopen(false)
                }}
              positive
            />
          </Modal.Actions>
        </Modal>
    );
  }

export default ChangeList;
