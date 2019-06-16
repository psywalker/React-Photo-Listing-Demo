import React, { memo, useState } from 'react';
import { Button, Icon } from 'antd';
import Modal from 'react-awesome-modal';
import setInfoPhotoModalContent from './infoPhotoModalContent';
import './index.scss';

const InfoPhotoModal = memo(({ ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const photoModalContent = setInfoPhotoModalContent(props);

  return (
    <div className="photo-info-wrap">
      <Button
        style={{ marginLeft: '10px' }}
        href="#"
        onClick={openModal}
      >
        <Icon type="info-circle" />
        Info
      </Button>
      <Modal
        visible={modalVisible}
        height="365px"
        effect="fadeInDown"
        onClickAway={closeModal}
        className="modal"
      >
        {photoModalContent}
      </Modal>
    </div>
  );
});

export default InfoPhotoModal;
