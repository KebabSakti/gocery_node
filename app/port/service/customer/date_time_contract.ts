abstract class DateTimeContract {
  abstract timeNow(): string;

  abstract startIsBeforeEnd(start: string, end: string): boolean;
}

export default DateTimeContract;
