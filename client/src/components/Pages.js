import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, ButtonGroup} from "react-bootstrap";

const Pages = observer(() => {
  const {device} = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages[i] = i + 1
  }

  return (
    <ButtonGroup className={'mt-5'}>
      {
        pages.map(page =>
          <Button
            active={device.page === page}
            variant={'outline-dark'}
            className={'rounded-0'}
            key={page}
            onClick={() => device.setPage(page)}
          >
            {page}
          </Button>
        )
      }
    </ButtonGroup>
  );
});

export default Pages;