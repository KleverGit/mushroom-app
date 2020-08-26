import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';

export abstract class BaseService {

    baseUrl: string;

    protected httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
    };

    constructor(protected http: HttpClient) {
    }

    /**
     * metodo GET
     */
    get(url: string, responseType?: string, body?, headers?: any): Observable<any | Blob> {
        if (responseType === 'blob') {
            return this.http.get(`${this.baseUrl}${url}`, {
                responseType: responseType,
                params: body,
                withCredentials: true
            })
                .pipe(
                    tap(_ => this.log(`fetched url:${url}`)),
                    catchError(this.handleErrorGet()));
        }
        return this.http.get<any>(`${this.baseUrl}${url}`, { headers })
            .pipe(
                catchError(this.handleErrorGet())
            );
    }

    private handleErrorGet() {
        return this.handleError('method get', []);
    }

    /**
     * metodo GET
     */
    getWithoutBaseUrl(url: string, responseType?: string, body?, headers?: any): Observable<any | Blob> {
        if (responseType === 'blob') {
            return this.http.get(`${url}`, { headers: headers.headers, responseType: 'blob', withCredentials: true })
                .pipe(
                    tap(_ => this.log(`fetched url:${url}`)),
                    catchError(this.handleErrorGet()));
        }
        return this.http.get<any>(`${url}`, headers)
            .pipe(
                catchError(this.handleErrorGet())
            );
    }

    /**
     * metodo POST
     */
    post(url: string, body?: Object, headers?: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}${url}`, body, {
            withCredentials: true,
            observe: 'response'
        }).pipe(
            map(resp => {
                return resp;
            })
        ).pipe(
            // tap(_ => this.log(`fetched url:${url}`)),
            catchError(this.handleError('method post', []))
        );
    }

    /**
     * Metodo POST sin baseUrl.
     * @param url url del post
     * @param body datos
     * @param headers cabecera
     */
    postWithoutBaseUrl(url: string, body?: Object, headers?: any): Observable<any> {
        return this.http.post<any>(`${url}`, body, { withCredentials: true })
            .pipe(
                map(resp => {
                    return resp;
                })
            ).pipe(
                catchError(this.handleError('method post without base', []))
            );
    }

    /**
     * Meodo post que retorna con headers
     */
    postWithHeader(url: string, body?: Object, headers?: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}${url}`, body, { observe: 'response' })
            .pipe(
                catchError(this.handleError('method post', []))
            );
    }

    /**
     * metodo DELETE
     */
    delete(url: string, body?: Object): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${url}`, body)
            .pipe(
                tap(_ => this.log(`fetched url:${url}`)),
                catchError(this.handleError('method delete', []))
            );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            window.console.error(error.error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.error}`);
            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return observableThrowError(error);

        };
    }

    /** Log a message  */
    protected log(message: string) {
        console.log(`${this.constructor.name}:${message}`);
    }

}
