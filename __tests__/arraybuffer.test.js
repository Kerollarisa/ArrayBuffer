import ArrayBufferConverter from '../src/js/ArrayBufferConverter.js';
import getBuffer from '../src/js/getBuffer.js';

describe('getBuffer', () => {
  test('возвращает ArrayBuffer', () => {
    const buffer = getBuffer();
    expect(buffer).toBeInstanceOf(ArrayBuffer);
  });

  test('длина буфера = длина строки * 2', () => {
    const buffer = getBuffer();
    const expectedLength =
      '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}'.length * 2;
    expect(buffer.byteLength).toBe(expectedLength);
  });
});

describe('ArrayBufferConverter', () => {
  test('load + toString восстанавливает исходную строку', () => {
    const converter = new ArrayBufferConverter();
    converter.load(getBuffer());
    expect(converter.toString()).toBe(
      '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}',
    );
  });

  test('toString выбрасывает ошибку, если буфер не загружен', () => {
    const converter = new ArrayBufferConverter();
    expect(() => converter.toString()).toThrow('Buffer is not loaded');
  });

  test('load перезаписывает ранее загруженный буфер', () => {
    const converter = new ArrayBufferConverter();
    converter.load(getBuffer());
    converter.load(getBuffer()); // повторная загрузка
    expect(converter.toString()).toBe(
      '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}',
    );
  });

  test('результат toString можно распарсить обратно в объект', () => {
    const converter = new ArrayBufferConverter();
    converter.load(getBuffer());
    const json = JSON.parse(converter.toString());
    expect(json).toEqual({
      data: { user: { id: 1, name: 'Hitman', level: 10 } },
    });
  });
});