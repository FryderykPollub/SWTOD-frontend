function createData(
  subjectId,
  facultyName,
  subjectName,
  fieldOfStudiesName,
  typeOfStudiesName,
  year,
  semesterType,
  lectureHoursNumberPerWeek,
  seminaryHoursNumberPerWeek,
  exerciseHoursNumberPerWeek,
  laboratoryHoursNumberPerWeek,
  projectHoursNumberPerWeek,
  groupsPerLecture,
  groupsPerSeminary,
  groupsPerExercise,
  groupsPerLaboratory,
  groupsPerProject
) {
  return {
    subjectId,
    facultyName,
    subjectName,
    fieldOfStudiesName,
    typeOfStudiesName,
    year,
    semesterType,
    lectureHoursNumberPerWeek,
    seminaryHoursNumberPerWeek,
    exerciseHoursNumberPerWeek,
    laboratoryHoursNumberPerWeek,
    projectHoursNumberPerWeek,
    groupsPerLecture,
    groupsPerSeminary,
    groupsPerExercise,
    groupsPerLaboratory,
    groupsPerProject,
  };
}

export const DATA = [
  createData(
    1,
    "WEII",
    "Bezpieczeństwo Informacji",
    "I",
    "INS",
    2,
    "Z",
    3,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ),
  createData(
    2,
    "WEII",
    "Bezpieczeństwo Informacji",
    "I",
    "IST",
    2,
    "Z",
    2,
    1,
    0,
    0,
    0,
    0,
    2,
    4,
    0,
    0
  ),
  createData(
    3,
    "WEII",
    "Bezpieczeństwo systemów informatycznych (przedmiot w jęz. angielskim)",
    "I",
    "MNS",
    1,
    "Z",
    3,
    1,
    0,
    0,
    0,
    0,
    3,
    2,
    0,
    0
  ),
  createData(
    4,
    "WEII",
    "Bezpieczeństwo systemów informatycznych (przedmiot w jęz. angielskim)",
    "I",
    "MSN",
    1,
    "L",
    2,
    1,
    0,
    0,
    0,
    0,
    2,
    6,
    0,
    0
  ),
  createData(
    5,
    "WEII",
    "Cyberbezpieczeństwo",
    "I",
    "IST",
    3,
    "Z",
    2,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ),
];
