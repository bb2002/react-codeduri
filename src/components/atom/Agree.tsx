import React, { useState } from 'react'
import { Modal } from 'antd';

const AgreeComp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p><b>KNU CodingPlatform</b>에서 회원님의 개인정보에 접근하는 것에 동의하십니까?</p>
        <br></br>
        <br></br>
        <p>제공된 정보는 이용자 식별, 통계, 계정 연동 등을 위해 서비스 이용기간동안 활용/보관됩니다. 기본정보 및 필수 제공 항목은 KNU CodingPlatform 서비스를 이용하기 위해 반드시 제공되어야 할 정보입니다. </p>
        <br></br>
        <br></br>
        <b><p>필수 제공 항목</p></b>
        <br></br>
        <p>학번, 이름, 전화번호, 학과</p>
      </Modal>
    </div>
  )
}

export default AgreeComp;