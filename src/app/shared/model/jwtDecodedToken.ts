export class JwtDecodedToken {
    aud: string[];
    // tslint:disable-next-line: variable-name
    user_name: string;
    scope: string[];
    exp: number;
    authorities: string[];
    jti: string;
    // tslint:disable-next-line: variable-name
    client_id: string;
}
// aud: ["mitoresourceid"]
// user_name: "santiceron023@gmail.com"
// scope: (2) ["read", "write"]
// exp: 1578500680
// authorities: Array(2)
// 0: "DBA"
// 1: "ADMIN"
// length: 2
// __proto__: Array(0)
// jti: "018f7358-fc22-4391-9a94-7157e182889a"
// client_id: "mitomediapp"