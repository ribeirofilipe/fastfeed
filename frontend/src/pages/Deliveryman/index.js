import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaPlus, FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import {
  getDeliverymenRequest,
  deleteDeliverymenRequest,
} from '~/store/modules/deliveryman/actions';

import { Table, Items } from '~/components/Table/styles';
import { EmptyList, Edit, Delete, ActionItem } from './styles';
import { Modal } from '~/components/Modal/Action/styles';
import Confirmation from '~/components/Modal/Confirmation';
import NamePhoto from '~/components/NamePhoto';
import Pagination from '~/components/Pagination';

export default function Deliveryman() {
  const dispatch = useDispatch();
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [deliverymanEmail, setDeliverymanEmail] = useState(0);

  const { deliverymen, total } = useSelector(state => state.deliveryman);

  useEffect(() => {
    dispatch(getDeliverymenRequest());
  }, [dispatch]);

  function handleOpenDialog(email) {
    setDeliverymanEmail(email);
    setIsVisible(true);
  }

  function handleOpenModal(email) {
    if (email === selectedEmail) {
      setSelectedEmail(0);
    } else {
      setSelectedEmail(email);
    }
  }

  function handleDeleteDelivery(email) {
    dispatch(deleteDeliverymenRequest(email));
  }

  function handleGetDeliverymen(name) {
    dispatch(getDeliverymenRequest(name));
  }

  function getDeliverymen(page) {
    dispatch(getDeliverymenRequest(null, page));
  }

  return (
    <Table>
      <span>Gerenciando encomendas</span>
      <div>
        <input
          onChange={e => handleGetDeliverymen(e.target.value)}
          placeholder="Buscar por encomendas"
        ></input>

        <Link to="deliveryman-save">
          <button type="button">
            <span>
              <FaPlus />
            </span>
            <span>CADASTRAR</span>
          </button>
        </Link>
      </div>

      <Confirmation
        isVisible={isVisible}
        handleExecute={() => handleDeleteDelivery(deliverymanEmail)}
        handleSetVisible={setIsVisible}
      />

      <Items>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.length > 0 ? (
            deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td># {deliveryman.id}</td>
                <td>
                  <span>
                    {deliveryman.avatar ? (
                      <img src={deliveryman.avatar.url} alt="avatar" />
                    ) : (
                      <NamePhoto name={deliveryman.name} />
                    )}
                  </span>
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  {' '}
                  <ActionItem
                    onClick={() => handleOpenModal(deliveryman.email)}
                  >
                    <FaEllipsisH />
                    <Modal
                      style={{
                        display:
                          deliveryman.email === selectedEmail
                            ? 'block'
                            : 'none',
                      }}
                    >
                      <Link
                        to={{
                          pathname: 'deliveryman-save',
                          state: deliveryman.id,
                        }}
                      >
                        <Edit>
                          <MdEdit />
                        </Edit>
                        <p>Editar</p>
                      </Link>
                      <div onClick={() => handleOpenDialog(deliveryman.email)}>
                        <Delete>
                          <MdDeleteForever />
                        </Delete>
                        <p>Deletar</p>
                      </div>
                    </Modal>
                  </ActionItem>
                </td>
              </tr>
            ))
          ) : (
            <EmptyList>
              <p>Nenhum item encontrado.</p>
            </EmptyList>
          )}
        </tbody>
      </Items>
      {deliverymen && deliverymen.length > 0 && (
        <Pagination loadItems={getDeliverymen} itemsLenght={total} />
      )}
    </Table>
  );
}
