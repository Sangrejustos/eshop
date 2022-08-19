import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <ListGroup>
      {
        device.types.map((item, index) =>
          <ListGroup.Item
            action
            variant={'light'}
            className={index === 0 ? '' : 'border-top-0'}
            style={{cursor: 'pointer', border: '1px solid #141619'}}
            active={item.id === device.selectedType.id}
            key={item.id}
            onClick={() => {
              device.selectedType === item
                ? device.setSelectedType({})
                : device.setSelectedType(item)
            }}
          >
            {item.name}
          </ListGroup.Item>
        )
      }
    </ListGroup>
  );
});

export default TypeBar;