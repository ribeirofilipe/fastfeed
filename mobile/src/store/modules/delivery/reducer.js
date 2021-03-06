import produce from 'immer';

const INITIAL_STATE = {
	token: null,
	signed: false,
  loading: false,
  deliveryman: null,
  deliveries: [],
  deliveriesPending: [],
};

export default function delivery(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@delivery/GET_DELIVERYMAN_DELIVERIES_REQUEST': {
				draft.loading = true;
				break;
			}
			case '@delivery/GET_DELIVERYMAN_DELIVERIES_SUCCESS': {
				draft.signed = true;
        draft.loading = false;
        draft.deliveries = action.payload.deliveries;
				break;
      }
      case '@delivery/GET_DELIVERYMAN_DELIVERIES-PENDING_REQUEST': {
				draft.loading = true;
				break;
			}
			case '@delivery/GET_DELIVERYMAN_DELIVERIES_PENDING_SUCCESS': {
				draft.signed = true;
        draft.loading = false;
        draft.deliveriesPending = action.payload.deliveriesPending;
				break;
      }
      case '@delivery/START_DELIVERY_REQUEST': {
				draft.loading = true;
				break;
			}
			case '@delivery/START_DELIVERY_SUCCESS': {
        const { id, start_date } = action.payload;

        draft.deliveriesPending = draft.deliveriesPending.map(delivery => ({
          ...delivery,
          start_date: delivery.id === id ? start_date : delivery.start_date,
        }));

        draft.loading = false;
				break;
      }
      case '@deliveryConfirm/SEND_DELIVERY_CONFIRM_SUCCESS': {
        const { id, end_date } = action.payload;

        draft.deliveriesPending = draft.deliveriesPending.map(delivery => ({
          ...delivery,
          end_date: delivery.id === id ? end_date : delivery.end_date,
        }));
      }
			default:

		}
	});
}
