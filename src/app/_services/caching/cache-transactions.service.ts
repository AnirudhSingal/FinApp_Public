import { Injectable } from '@angular/core';
import {openDB} from 'idb';
import { HttpRequest, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const idb = {
  db1: null
}

const createStore = () =>{
  return openDB('CacheDB' , 1,{
    upgrade(db){
      db.createObjectStore('mystore');
      if(!db.objectStoreNames.contains('mystore')){
        db.createObjectStore('test');
        db.deleteObjectStore('test');
      }
      db.close();
    }
  });
}

const getTransaction = (url: string) => {
  return openDB('CacheDB',1).then( db =>{
    return db.get('mystore', url)
  })
  .then( cached => cached)
}
const getAllTransaction = () =>{
  return openDB('CacheDB',1).then( db =>{
    return db.getAll('mystore')
  })
  .then(allCached => allCached)
}

const deleteTransaction = (key: string) => {
  return openDB('CacheDB',1).then(db =>{
    return db.delete('mystore', key)
  })
}
const putTransaction =  (response: HttpResponse<any>, url: string,ms: number) =>{
  return openDB('CacheDB',1).then(db =>{
    db.put('mystore', 
      {
        url, 
        responseObject: JSON.stringify(response), 
        // this stringify will change the date format to UTC which messses thing up
        // to resolve that, I have implemented a override for Date.prototype.toJSON()
        // in app module constructor 

        expiry: Date.now() + ms
      }, 
      url)
    })
}

const cleanCache =  () => {
  let deletePromises = [];
  getAllTransaction().then( cachedAll => {

    if(cachedAll != undefined ){
      cachedAll.forEach(entry => {
        if(entry.expiry < Date.now()){
          deletePromises.push(deleteTransaction(entry.url))
        }
      });
      let promises = Promise.all(deletePromises); 
      return promises;
    }
  }).catch((err)=>{console.log("Getall Failed")});
}

@Injectable({
  providedIn: 'root'
})
export class CacheTransactionsService{

  constructor(private http: HttpClient) {
    setInterval(cleanCache, 60000);
  }
  
  async ConnectToIDB() {

    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }else{
      console.log('This browser supports IndexedDB');
    }
    return createStore().catch((error) => console.log("Create Failed"));
    // try {
    //     await openDB('CacheDB',1,{
    //       upgrade : (db) => {
    //         console.log("############# db opened!!!! #############");
    //         console.log(db);
    //         if(!db.objectStoreNames.contains('mystore')){
    //           db.createObjectStore('mystore');
    //         }
    //         db.close();
    //     },
    //   })
    // } catch (error) {
    //   console.log('Error creating db: ' , error);      
    // }
  }
  
  async get(req: HttpRequest<any>) : Promise<any>{   
    // : Promise<HttpResponse<any> | undefined>
    const url = req.urlWithParams;
    return getTransaction(url).then(cached =>{
      return cached;
    })
    .catch(err =>{
      return undefined;
    })
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>, ms:number){
    const url = req.url;
    return putTransaction(response,url,ms)
    .then(_ => _)
    .catch(err => 'Put Failed')
  }

  delete(req: HttpRequest<any>){
    const url = req.url;
    return deleteTransaction(url)
    .then(_ => 'Delete Compeleted')
    .catch(err => 'Delete Failed' )
  }


  getCacheable<T>(req: string, ms: number): Observable<T>{
    let headers =  new HttpHeaders();
    headers = headers.append('Cacheable-Request','*')
                     .append('Expiry', ms.toString());
    return this.http.get<T>(req, {headers: headers})
    // .pipe(
    //   delayedRetry(1000, 120), // https://medium.com/angular-in-depth/retry-failed-http-requests-in-angular-f5959d486294
    //   catchError(error => {
    //     return EMPTY;
    //   })
    // );
  }
}

