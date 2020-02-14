import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [User, Recipient, File, Deliveryman, Order, DeliveryProblem];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
      this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
  }
}

export default new Database();
