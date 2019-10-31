import React, { memo, useState } from 'react';
import { Button, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import Modal from 'react-awesome-modal';
import InfoPhotoModalContent from './InfoPhotoModalContent';
import './index.scss';

const InfoPhotoModal = memo(({ ...props }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
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
        { t('photoInfo.views') }
      </Button>
      <Modal
        data-test="modal"
        visible={modalVisible}
        effect="fadeInDown"
        onClickAway={closeModal}
        className="modal"
      >
        <InfoPhotoModalContent {...props} />
      </Modal>
    </div>
  );
});

export default InfoPhotoModal;
