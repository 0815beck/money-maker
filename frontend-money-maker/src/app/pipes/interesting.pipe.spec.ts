import { InterestingPipe } from './interesting.pipe';

describe('InterestingPipe', () => {
  it('create an instance', () => {
    const pipe = new InterestingPipe();
    expect(pipe).toBeTruthy();
  });
});
