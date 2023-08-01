import { fetchUsers } from '../slices/searchSlice.js';
global.fetch = jest.fn();
describe('userThunk', () => {
  it('should fetchUsers with resolved response', async () => {
    const mockUsers = [{
        avatar_url: 'https://avatars.githubusercontent.com/u/71697446?v=4',
        id: 71697446,
        login: 'isabella232',
      }]
    
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });
    const dispatch = jest.fn();
    const thunk = fetchUsers();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
     console.log(end)
    
    expect(start[0].type).toBe('search/fetchUsers/pending');
    expect(end[0].type).toBe('search/fetchUsers/fulfilled');
    expect(end[0].payload).toBe(mockUsers);
  });
  it('should fetchUsers with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = fetchUsers();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('search/fetchUsers/pending');
    expect(end[0].type).toBe('search/fetchUsers/rejected');
  });
});
