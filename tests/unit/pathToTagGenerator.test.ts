import { describe, it, expect } from 'vitest';
import pathToTag from '../../src/shared/pathToTagGenerator';

describe('pathToTagGenerator', () => {
  it('generates a path with /tags/ prefix', () => {
    expect(pathToTag('rust')).toBe('/tags/rust/');
  });

  it('converts to lowercase', () => {
    expect(pathToTag('Rust')).toBe('/tags/rust/');
  });

  it('converts spaces to dashes', () => {
    expect(pathToTag('soft skills')).toBe('/tags/soft-skills/');
  });

  it('handles multiple spaces', () => {
    expect(pathToTag('large  language  models')).toBe('/tags/large-language-models/');
  });
});
