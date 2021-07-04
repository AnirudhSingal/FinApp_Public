import { NullValueConverterPipe } from './null-value-converter.pipe';

describe('NullValueConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new NullValueConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
