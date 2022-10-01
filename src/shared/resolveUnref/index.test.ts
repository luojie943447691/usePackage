import { ref } from 'vue';
import { resolveUnref } from '.';

describe('resolveUnref', () => {
  it('should be value', () => {
    const a = resolveUnref(ref(0));
    const b = resolveUnref(() => 'hello');
    const c = resolveUnref('hello');

    expect(a).toBe(0);
    expect(b).toBe('hello');
    expect(c).toBe('hello');
  });
});

export {};
