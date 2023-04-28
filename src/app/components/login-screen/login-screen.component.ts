import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  @Output('logIn')
  public $outLogin = new EventEmitter<void>();

  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userCode: new FormControl(null),
    });
  }

  onSubmit() {
    localStorage.setItem('user-code', this.form.value.userCode);
    this.$outLogin.emit();
  }

}
