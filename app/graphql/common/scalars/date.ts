import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

module.exports = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.getTime();
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

