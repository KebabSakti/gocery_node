import { v4 as uuidv4 } from "uuid";

class RandomStringGenerator {
  private suffix?: string;
  private prefix?: string;

  udin: string = "";

  constructor(suffix?: string, prefix?: string) {
    this.suffix = suffix;
    this.prefix = prefix;
  }

  public uuidv4(): string {
    let randomString: string = this.suffixPrefix(uuidv4());

    return randomString;
  }

  private suffixPrefix(randomString: string): string {
    if (this.prefix != undefined) {
      randomString = `${this.prefix}${randomString}`;
    }

    if (this.suffix != undefined) {
      randomString = `${randomString}${this.suffix}`;
    }

    return randomString;
  }
}

export default RandomStringGenerator;
