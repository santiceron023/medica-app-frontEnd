import { AbstractControl } from '@angular/forms';


export class MatchPassword{

    // static matchValidator(control: FormControl): { [s: string]: boolean } {
    //     let passOld =  this.formGroup.get('passFormCtrl').value;
    //     let pass = this.formGroup.get('passNewFormCtrl').value;

    //     if(pass == passOld && this.logged){ this.noChangePass = true;
    //     }else{this.noChangePass = false}

    //     let pass2 = control.value;
    //     if (pass == pass2) return null;
    //     return { matchValidator: true }
    // }

    static MatchPassword(AC:AbstractControl){
        let pass = AC.get('password').value;
        let pass2 = AC.get('passwordConfirm').value;
        if(pass!=pass2){
            AC.get('passwordConfirm').setErrors({MatchPassword:true})
        }else{
            return null;
        }
    }

}