export default function getNeighborhoodsList() {
  const sanFranciscoNeighborhoods = ['SOMA', 'Union Square'];

  return {
    sanFranciscoNeighborhoods,
    addNeighborhood(newNeighborhood) {
      sanFranciscoNeighborhoods.push(newNeighborhood);
      return sanFranciscoNeighborhoods;
    }
  };
}
