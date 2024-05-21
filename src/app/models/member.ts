export class Member {
  type: string | undefined;
  title: string;
  firstname: string;
  lastname: string;
  birthdate: string;

  constructor(title:string, firstname:string, lastname:string, birthdate:string) {
    this.title = title;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
}
