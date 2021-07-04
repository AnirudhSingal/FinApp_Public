import { GetSymbolNamePipe } from './get-symbol-name.pipe';

describe('GetSymbolNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetSymbolNamePipe(null);
    expect(pipe).toBeTruthy();
  });
});
