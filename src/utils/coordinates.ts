export function compareCoordinates(
  currentCoordinates: any,
  listOfCoordinates: Array<any>,
): any {
  let match = null;
  listOfCoordinates.forEach(coordinates => {
    if (
      coordinates.longitude === currentCoordinates.longitude &&
      coordinates.latitude === currentCoordinates.latitude
    ) {
      match = coordinates;
    }
  });
  return match;
}
