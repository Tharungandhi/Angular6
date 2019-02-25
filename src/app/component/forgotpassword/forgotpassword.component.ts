import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public forgotpasswordForm: FormGroup;
  submitted = true;
 
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
      emailId: ['', Validators.required]
    });
  }
  get f() { return this.forgotpasswordForm.controls; }

  public onSubmit(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotpasswordForm.invalid) {
      return;

    }
    console.log(user);
    this.userService.forgotPassword(user);
  
  }
}

