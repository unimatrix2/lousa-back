// eslint-disable-next-line no-confusing-arrow
const parseProp = (body) => body?.nickname ? 'nickname' : 'email';

const parseValue = (body) => body?.nickname ?? body?.email;

const parser = (body) => JSON.parse(`{ "${parseProp(body)}": "${parseValue(body)}" }`);

export default parser;
