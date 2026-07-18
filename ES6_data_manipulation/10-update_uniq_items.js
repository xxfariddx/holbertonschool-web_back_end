export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }

  map.forEach((quantity, name) => {
    if (quantity === 1) {
      map.set(name, 100);
    }
  });

  return map;
}