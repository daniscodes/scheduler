export function getAppointmentsForDay(state, day) {
  const selectedApptDay = state.days.filter(days => days.name === day);
  const appointments = [];

  if (selectedApptDay[0]) {
    const dayIDs = selectedApptDay[0].appointments

    for (const numAppts of dayIDs) {
      appointments.push(state.appointments[numAppts]);
    }
  }
  return appointments;
}