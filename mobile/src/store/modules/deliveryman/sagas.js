import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;


    const response = yield call(
      api.get,
      `deliveryman/${id}`
    );

    const { name, email, createdAt, avatar } = response.data;

    yield put(
      signInSuccess({
        id,
        name,
        email,
        created_at: format(parseISO(createdAt), 'dd/MM/yyyy'),
        avatar,
      })
    );
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
  }
}

export default all([takeLatest('@deliveryman/SIGN_IN_REQUEST', singIn)]);
