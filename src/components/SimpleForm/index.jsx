import React from 'react';
import { Modal } from 'antd';

const SimpleForm = (props) => {
  const { title, modalVisible, onCancel, ...rest } = props;
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={onCancel}
      footer={null}
      {...rest}
    >
      {props.children}
    </Modal>
  );
};

export default SimpleForm;
