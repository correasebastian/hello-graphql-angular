import { Component, OnInit } from '@angular/core';
import { request } from 'graphql-request';

const BASE_URL = 'http://localhost:3100/graphql';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface QueryResponse {
  allStudents: Student[]
}

const AllStudentsQuery = `
  query allStudents {
    allStudents {
      id
      firstName
      lastName
      active
    }
  }
`;

@Component({
  selector: 'app-root',
  template: `
        <h1>{{title}}</h1>
        <pre>{{(students | async) | json}}</pre>
    `,
  styles: []
})
export class AppComponent implements OnInit {
  
  title = 'Students';
  students: Promise<Student[]>;
  constructor() {
  }

  ngOnInit(): void {
    this.students = request<QueryResponse>(BASE_URL, AllStudentsQuery)
    .then(data => data.allStudents)
  }

}
