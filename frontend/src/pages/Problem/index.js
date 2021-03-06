import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import {
  getProblemsRequest,
  cancelProblemRequest,
} from '~/store/modules/problem/actions';

import { Table, Items } from '~/components/Table/styles';
import { EmptyList, Edit, Delete, ActionItem } from './styles';
import { Modal } from '~/components/Modal/Action/styles';
import Confirmation from '~/components/Modal/Confirmation';
import Info from '~/components/Modal/Info';
import ModalInfo from './Info';
import Pagination from '~/components/Pagination';

export default function Problem() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const [deliveryId, setDeliveryId] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');

  const { problems, total } = useSelector(state => state.problem);

  useEffect(() => {
    dispatch(getProblemsRequest());
  }, [dispatch]);

  function getProblems(page) {
    dispatch(getProblemsRequest(page));
  }

  function handleOpenDialog(id) {
    setDeliveryId(id);
    setIsVisible(true);
  }

  function handleOpenModal(id) {
    if (id === selectedId) {
      setSelectedId(0);
    } else {
      setSelectedId(id);
    }
  }

  function handleCancelDelivery(id) {
    dispatch(cancelProblemRequest(id));
  }

  function handleOpenInfo(value) {
    setInfo(value);
    setOpen(true);
  }

  return (
    <Table>
      <span>Problemas na entrega</span>

      <Confirmation
        isVisible={isVisible}
        handleExecute={() => handleCancelDelivery(deliveryId)}
        handleSetVisible={setIsVisible}
      />

      <Info setOpen={setOpen} open={open}>
        <ModalInfo info={info} />
      </Info>

      <Items>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems && problems.length > 0 ? (
            problems.map(problem => (
              <tr key={problem.id}>
                <td># {problem.delivery_id}</td>
                <td>{problem.description}</td>
                <td>
                  {' '}
                  <ActionItem
                    onClick={() => handleOpenModal(problem.delivery_id)}
                  >
                    <FaEllipsisH />
                    <Modal
                      style={{
                        display:
                          problem.delivery_id === selectedId ? 'block' : 'none',
                      }}
                    >
                      <div onClick={() => handleOpenInfo(problem.description)}>
                        <Edit>
                          <MdEdit />
                        </Edit>
                        <p>Visualizar</p>
                      </div>
                      <div
                        onClick={() => handleOpenDialog(problem.delivery_id)}
                      >
                        <Delete>
                          <MdDeleteForever />
                        </Delete>
                        <p>Cancelar encomenda</p>
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
      {problems && problems.length > 0 && (
        <Pagination loadItems={getProblems} itemsLenght={total} />
      )}
    </Table>
  );
}
