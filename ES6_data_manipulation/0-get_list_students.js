/**
 * Returns an array of student objects.
 * 
 * @returns {Array<{id: number, firstName: string, location: string}>}
 */
export default function getListStudents() {
  return [
    {
      id: 1,
      firstName: 'Guillaume',
      location: 'San Francisco'
    },
    {
      id: 2,
      firstName: 'James',
      location: 'Columbia'
    },
    {
      id: 5,
      firstName: 'Serena',
      location: 'San Francisco'
    }
  ];
}