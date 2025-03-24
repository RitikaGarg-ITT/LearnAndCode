class Employee {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getAge() {
    return this.age;
  }

  setAge(age) {
    this.age = age;
  }

  getSalary() {
    return this.salary;
  }

  setSalary(salary) {
    this.salary = salary;
  }
}

let employee = new Employee("John", 30, 50000);

/*The employee variable is created using the new Employee() constructor,
 which means it's an instance of the Employee class. This instance has properties (name, age, salary) and 
 methods (getName(), setName(), getAge(), setAge(), getSalary(), setSalary()) attached to it.*/
