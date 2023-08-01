import searchReducer from '../slices/searchSlice.js';

const initialState = {};
describe('search reducer', () => {
  it('should handle set input', () => {
    expect(
      searchReducer(initialState, {
        type: 'search/setInput',
        payload: 'lexie',
      })
    ).toStrictEqual({inputUser:'lexie'});
  });
});
