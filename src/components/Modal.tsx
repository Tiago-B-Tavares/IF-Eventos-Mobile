import { Button, Center, Modal } from "native-base";
import React from "react";
interface modalProps{
    header:string,
    body:string,
    footer:string,
    CancelButton:string,
    SaveButton:string    
}

const ModalComponent = ({header, body, footer, CancelButton, SaveButton}: modalProps
) => {
    const [showModal, setShowModal] = React.useState(false);
    return <Center>
        <Button onPress={() => setShowModal(true)}>Button</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
        _dark: {
          bg: "coolGray.800"
        },
        bg: "warmGray.50"
      }}>
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>{header}</Modal.Header>
            <Modal.Body>
              {body}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                  {CancelButton}
                </Button>
                <Button onPress={() => {
                setShowModal(false);
              }}>
                  {SaveButton}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>;
  };
  export default ModalComponent