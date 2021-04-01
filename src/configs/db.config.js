/* eslint-disable no-console */
import { connect } from 'mongoose';

const mongoConnect = (url) => {
  connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
};

export default mongoConnect;
