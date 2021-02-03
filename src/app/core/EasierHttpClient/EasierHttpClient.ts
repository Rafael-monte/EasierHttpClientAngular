import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exceptions } from './Exceptions/Exceptions';
import { isDefined } from './helpers';
import {tap} from 'rxjs/operators';
export class EasierHttpClient {

    readonly HTTP_STRING: string = 'http:';
    readonly HTTPS_STRING: string = 'https';

    mainEnvironment: string = environment.api;

    setEnvironment(environmentLink: string) {
        this.isHttpOrHttps(environmentLink);
        this.mainEnvironment = environmentLink;
    }
    
    private isHttpOrHttps(environmentLink: string) {
        let envLink = environmentLink.substring(0, 5);
        if (envLink !== this.HTTP_STRING || envLink !== this.HTTPS_STRING) {
            Exceptions.prototype.protocolNotFoundException();
        }
        
    }

    public getMethod<T>(type: T, isGetArray: boolean, restLocation: string, id?: number, customEnvironment?: string) {
        let env: string = '';
        isDefined(customEnvironment) ? env = customEnvironment : env = this.mainEnvironment; 
        if (isDefined(id)) {
            return this.getByIdMethod(type, restLocation, id, env);
        }
            return this.getAllMethod(type, restLocation, env, isGetArray);
    }

    private getAllMethod<T>(type: T, restLocation: string, env: string, isGetArray: boolean) {
        return this.stringifyArrayData(HttpClient.prototype.get<Array<typeof type>>(`${env}/${restLocation}`))
    }


    private stringifyArrayData<T>(httpContent: Observable<T[]>): Observable<T[]> {
        return httpContent.pipe(tap(res => JSON.stringify(res)));
    }
    
    private getByIdMethod<T>(type: T, restLocation: string, id: number, env: string): Observable<T> {
        return this.stringifyData(HttpClient.prototype.get<typeof type>(`${env}/${restLocation}/${id}`))

    }
    private stringifyData<T>(httpContent: Observable<T>): Observable<T> {
       return httpContent.pipe(tap(res => JSON.stringify(res)));
    }

    


}