import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
 private hide = true;
 

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  this.loginForm = this.formBuilder.group({
    emailId: ['', Validators.required],
    password: ['', Validators.required],
  });
  }

  get f() { return this.loginForm.controls; }

 public onSubmit(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;

    }
    console.log(user);
    this.userService.login(user).subscribe(response => {
      console.log(response);
          localStorage.setItem('token', response.headers.get('token'));
        this.router.navigate(['/homepage']);
    }, (error) => {
      console.log("login Unsuccessfull", error);
    });;
  }
}
