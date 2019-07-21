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
    <div
      data-test="photoInfoWrap"
      className="photo-info-wrap"
    >
      <Button
        data-test="openModalBtn"
        style={{ marginLeft: '10px' }}
        onClick={openModal}
      >
        <Icon
          data-test="openModalBtnIcon"
          type="info-circle"
        />
        Info
      </Button>
      <Modal
        data-test="modal"
        visible={modalVisible}
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
