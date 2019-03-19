import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  constructor(private http: HttpClient) { }
  
    putService(url, object,header) {
      return this.http.put<any>(url, object,header);
    }
  
   
  
    postService(url, object) {
      console.log("in httpservice...")
      return this.http.post<any>(url, object, { observe: 'response' });
    }
  
  

  getService(url,header) {
    return this.http.get<any>(url,header);
  }

 

  deleteService(url,header) {
    return this.http.delete<any>(url, header);
  }

  postWithBody(url,object,header){
    return this.http.post<any>(url,object,header);
  }

  postWithUpdate(url,object,header){
    return this.http.post<any>(url,object,header);
  }
  
  labelUpdateService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

 

  labelCreateService(url,object,header){
    return this.http.post<any>(url,object,header);
}

postForImage(url,object,header):Observable<any>{
  return this.http.post<any>(url,object,header);
}

getUserEmail(url,header)
{
  return this.http.get<any>(url,header);
}
postForCollaborator(url,header)
{
  return this.http.post<any>(url,{},header);
}

getCollaborateUser(url)
{
  return this.http.get<any>(url,{});
}

removeCollaborateUser(url)
{
  return this.http.delete<any>(url,{});
}
}