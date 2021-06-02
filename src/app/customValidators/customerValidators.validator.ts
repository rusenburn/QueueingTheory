import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    // public static rhoMustBeLessThanServers(): ValidatorFn {
    //     return (group: AbstractControl): ValidationErrors | null => {
    //         const arrivals = +group.get('arrivals').value;
    //         const servers = +group.get('servers').value;
    //         const serviceRate = +group.get('services').value;
    //         console.log(arrivals / serviceRate);
    //         console.log(servers);
    //         if (arrivals / serviceRate < servers) {
    //             return null;
    //         } else {
    //             return { rhoLessThanServers: true };
    //         }
    //     };
    public static rhoMustBeLessThanServers: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        const arrivals = +group.get('arrivals').value;
        const servers = +group.get('servers').value;
        const serviceRate = +group.get('services').value;
        if (arrivals / serviceRate < servers) {
            return null;
        } else {
            return { rhoLessThanServers: true };
        }
    }
}

