export default class TimeConverter {
  convertTimeToMinutes(time: string) {
    const [hour, minutes] = time.split(":").map(Number);
    const timeInMinutes = (hour * 60) + minutes;
  
    return timeInMinutes;
  }

  convertTimeToHours(time: number) {
    const hours = time / 60;
    const minutes = time % 60;

    return [hours, minutes];
  }
}
