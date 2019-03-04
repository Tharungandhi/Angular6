import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public resetpasswordForm: FormGroup;
  loading = false;
  submitted = false;
  public id = this.route.snapshot.params.id;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.resetpasswordForm = this.formBuilder.group({
      password:['', Validators.required]
    });
  }
  get f() { return this.resetpasswordForm.controls; }
 


    public onSubmit(user) {
      this.submitted = true;

      if (this.resetpasswordForm.invalid) {
        return;
      }

    
    console.log(user);
    this.userService.resetPassword(user,this.id);
  }
  }

