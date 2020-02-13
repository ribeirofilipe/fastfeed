import * as Yup from 'yup';

export default async(req, res, next) => {
  try {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch(err) {
    return res
    .status(404)
    .send({ error: 'Validation fails', message: err.inner });
  }
};
