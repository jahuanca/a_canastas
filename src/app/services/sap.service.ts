import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SAPService {

  readonly URL_API = `https://200.107.154.142:44300/sap/bc/srt/rfc/sap/zhcm_ws_absentismo/200/zhcm_ws_absentismo/zhcm_ws_absentismo_b`
  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    //this.headers = this.headers.append('Accept-Encoding', 'gzip,deflate');
    this.headers = this.headers.append('Content-Type', 'text/xml;charset=UTF-8');
    //this.headers = this.headers.append('Content-Length', '356');
    this.headers = this.headers.append('Host', 'ecs-hanaqas.agrovision.com:44300');
    //this.headers = this.headers.append('Connection', 'Keep-Alive');
    //this.headers = this.headers.append('User-Agent', 'Apache-HttpClient/4.5.5 (Java/12.0.1)');
    //this.headers = this.headers.append('Cookie', 'sap-usercontext=sap-client=200');
    this.headers = this.headers.append('SOAPAction', 'application/soap+xml;charset=UTF-8;action="urn:sap-com:document:sap:soap:functions:mc-style:ZHCM_WS_ABSENTISMO:ZhcmWsAbsentismoRequest"');
    this.headers = this.headers.append('Authorization', 'Basic ' + btoa('nsosa:Nestor.2020'));
    //this.headers = this.headers.append('Authorization', 'Basic bnNvc2E6TmVzdG9yLjIwMjA=');
  }

  getAbsentismo() {
    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">'
      + '<soapenv:Header/>'
      + '<soapenv:Body>'
      + '<urn:ZhcmWsAbsentismo>'
      + '<IDesde>2021-05-01</IDesde>'
      + '<IHasta>2021-05-10</IHasta>'
      + '</urn:ZhcmWsAbsentismo>'
      + '</soapenv:Body>'
      + '</soapenv:Envelope>';
    return this.http.post(this.URL_API, body, { headers: this.headers, },);
  }

}
