import { MaskedAccountPipe } from './masked-account-pipe-pipe';

describe('MaskedAccountPipe', () => {
  it('create an instance', () => {
    const pipe = new MaskedAccountPipe();
    expect(pipe).toBeTruthy();
  });
});
